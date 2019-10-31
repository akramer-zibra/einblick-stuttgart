import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Protokoll, Datei } from '../dokumente';

export class SuchergebnisProtokolleScraper {

    /** url path */
    private urlPath: string;

    /**
     * Constructor method
     */
    constructor(urlPath:string = "https://www.domino1.stuttgart.de/web/ksd/ksdRedSystem.nsf") {

        // Initial options
        this.urlPath = urlPath;

        // We use german locale for time functions
        dateUtil.locale("de");
    };

    /**
     * Method scrapes "Protokoll" from given cheerio dom
     * @param $
     */
    scrape($: CheerioStatic): Protokoll[] {

        const result: Protokoll[] = [];

        // We load second table from page
        const secondTable = $('table').toArray()[1];

        // 
        const rows = $(secondTable).find('tr').toArray();

        // We iterate each table row 
        // and skip the first one (headline)!
        for(let i=1; i<rows.length; i++) {

            // Load columns as array
            const columns = $(rows[i]).find('td').toArray();

            // Extract Nr
            // and reference Protokoll-file
            const firstCell = $(columns[0]);
            const {top, nnr} = this.extractTopAndNnr(firstCell);
            const protokoll = this.extractProtokollDatei(firstCell);

            // Extract Date 
            // and parse it into Date object
            const datum = this.extractDatum($(columns[1]));

            // Extract Betreff & Ausschuss
            const thirdCell = $(columns[2]);
            const betreff = this.extractBetreff(thirdCell);
            const ausschuss = this.extractAusschuss(thirdCell);

            // Extract reference to Verhandlung (GRDrs)
            // NOTICE: needs to scrape PDF file..
            
            result.push({
                class: 'Protokoll',
                top,
                nnr,
                datum,
                betreff,
                ausschuss,
                protokoll
            });
        }

        return result;
    }

    /**
     * Method extracts "TOP" and "Niederschrift Nr." from given table cell
     * @param cell 
     */
    private extractTopAndNnr(cell): {top, nnr} {
        const idAnchor = cell.find('a');
        const tokens = idAnchor.text().split(' ');
        return {top: tokens[1], nnr: tokens.pop()}  // Second token is TOP number, last token is protokoll number
    }

    /**
     * Method extracts "Protokoll" from given table cell
     * @param cell 
     */
    private extractProtokollDatei(cell): Datei {
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
    private extractBetreff(cell) {
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
}