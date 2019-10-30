import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Buchungsunterlage, Datei } from '../dokumente';

export class SuchergebnisBunterlagenScraper {

    /** url path */
    private urlPath = 'https://www.domino1.stuttgart.de/web/ksd/ksdRedSystem.nsf';

    /**
     * Constructor method
     */
    constructor() {
        // We use german locale for time functions
        dateUtil.locale("de");
    };

    /**
     * Method scrapes "Buchungsunterlagen" from given cheerio dom
     * @param $
     */
    scrape($: CheerioStatic): Buchungsunterlage[] {

        const result: Buchungsunterlage[] = [];

        // We load first table from page
        const firstTable = $('table').toArray()[0];

        // 
        const rows = $(firstTable).find('tr').toArray();

        // We iterate each table row 
        // and skip the first one (headline)!
        for(let i=1; i<rows.length; i++) {

            // Load columns as array
            const columns = $(rows[i]).find('td').toArray();

            // Extract Id
            // and Veratungsvorlage
            const firstCell = $(columns[0]);
            const id = this.extractId(firstCell);
            const vorlage = this.extractVorlageDatei(firstCell);
                        
            // Extract Date 
            // and parse it into Date object
            const datum = this.extractDatum($(columns[1]));

            // Extract Title & Ausschuss
            const thirdCell = $(columns[2]);
            const titel = this.extractTitel(thirdCell);
            const ausschuss = this.extractAusschuss(thirdCell);

            // Extract Anhänge
            const anhaenge = this.extractAnhaenge($, $(columns[3]));

            // Push scraped data into collection
            result.push({
                class: "Beratungsunterlage",
                datum,
                id,
                titel,
                ausschuss,
                vorlage,
                anhaenge
            });
        }

        return result;
    }

    /**
     * Method extracts Id from given table cell
     * @param cell 
     */
    private extractId(cell): string {
        const idAnchor = cell.find('a');
        return idAnchor.text().replace('Drucksache ', '');
    }

    /**
     * Method extracts "Beratungsunterlage" from given table cell
     * @param cell 
     */
    private extractVorlageDatei(cell): Datei {
        const anchor = cell.find('a');
        return {
            class: "Datei",
            url: anchor.attr("href"),
            titel: anchor.text(),
            mime: "application/pdf"
        }
    }

    /**
     * Method extracts "datum" from given table cell
     * @param cell 
     */
    private extractDatum(cell) {
        const dateString = cell.find('p6').text().trim();
        return dateUtil.parse(dateString, 'DD.MM.YYYY');
    } 

    /**
     * Method extracts "titel" from given table cell
     * @param cell 
     */
    private extractTitel(cell) {
        return cell.find('b').text().trim();
    } 

    /**
     * Method extracts "Ausschuss" from given table cell
     * @param cell 
     */
    private extractAusschuss(cell) {
        const secondColumnTextLines = cell.find('p6').text().split("\n");    // Split Text into lines
        return secondColumnTextLines[secondColumnTextLines.length - 2];        // We need to skip last newline
    }

    /**
     * Method extracts all attached "Anhänge" from given table cell
     * @param $ 
     * @param cell 
     */
    private extractAnhaenge($, cell): Datei[] {
        const attachmentAnchors = cell.find('a').toArray();
        const anhaenge: any = [];

        attachmentAnchors.forEach((anchor) => {
            anhaenge.push({
                class: "Datei",
                url: this.urlPath + $(anchor).attr('href').replace('./.', ''),  // Remove broken path prefix and append with url path
                titel: $(anchor).text(),
                mime: "application/pdf"
            });
        });

        return anhaenge;
    }
}