import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Protokoll } from '../dokumente';

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

        // We load first table from page
        const firstTable = $('table').toArray()[0];

        // 
        const rows = $(firstTable).find('tr').toArray();

        // We iterate each table row 
        // and skip the first one (headline)!
        for(let i=1; i<rows.length; i++) {

            throw new Error("TODO...");
            
        }

        return result;
    }
}