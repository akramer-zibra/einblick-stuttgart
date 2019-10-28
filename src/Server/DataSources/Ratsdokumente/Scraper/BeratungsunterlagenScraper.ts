import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';

export class BeratungsunterlagenScraper {

    /** url path */
    private urlPath = 'https://www.domino1.stuttgart.de/web/ksd/ksdRedSystem.nsf';

    /**
     * Constructor method
     */
    public constructor() {
        // We use german locale for time functions
        dateUtil.locale("de");
    };

    /**
     * Method scrapes "Buchungsunterlagen" from given cheerio dom
     * @param $
     */
    public scrape($: CheerioStatic) {

        let result: any = [];

        // We load first table from page
        let firstTable = $('table').toArray()[0];

        // 
        let rows = $(firstTable).find('tr').toArray();

        // We iterate each table row 
        // and skip the first one (headline)!
        for(let i=1; i<rows.length; i++) {

            // Load columns as array
            let columns = $(rows[i]).find('td').toArray();

            // Extract Id
            let idAnchor = $(columns[0]).find('a');
            let id = idAnchor.text().replace('Drucksache ', '');
            
            // Extract Beratungsvorlage pdf
            let beratungsvorlage: any = {
                url: idAnchor.attr('href'),
                titel: idAnchor.text(),
                typ: "application/pdf"
            }
                        
            // Extract Date 
            // and parse it into Date object
            let dateString = $(columns[1]).find('p6').text().trim();
            let datum = dateUtil.parse(dateString, 'DD.MM.YYYY');

            // Extract Title & Ausschuss
            let titel = $(columns[2]).find('b').text().trim();

            let secondColumnTextLines = $(columns[2]).find('p6').text().split("\n");    // Split Text into lines
            let ausschuss = secondColumnTextLines[secondColumnTextLines.length - 2];        // We need to skip last newline
            
            // Extract Anhänge
            let attachmentAnchors = $(columns[3]).find('a').toArray();

            let anhaenge: any = [];

            attachmentAnchors.forEach((anchor) => {
                anhaenge.push({
                    "url": this.urlPath + $(anchor).attr('href').replace('./.', ''),  // Remove broken path prefix and append with url path
                    "titel": $(anchor).text(),
                    "typ": "application/pdf"
                });
            });

            // Push scraped data into collection
            result.push({
                datum,
                id,
                titel,
                ausschuss,
                beratungsvorlage,
                anhaenge
            });
        }

        return result;
    }
}