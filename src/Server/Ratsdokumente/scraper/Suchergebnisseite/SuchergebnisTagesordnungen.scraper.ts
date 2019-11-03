import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Datei, Tagesordnung } from '../../../../shared/dokumente';
import { Scraper } from '../../../interfaces';

export class SuchergebnisTagesordnungenScraper implements Scraper<Tagesordnung> {

    /** url path */
    private urlPath: string;

    /**
     * Konstruktor
     */
    constructor(urlPath:string = "https://www.domino1.stuttgart.de/web/ksd/ksdRedSystem.nsf") {

        // Initiale Optionen 
        this.urlPath = urlPath;

        // Wir setzen Deutschland als locale für die Datumsformatierung
        dateUtil.locale("de");
    };

    /**
     * Methode zieht "Protokoll" Daten aus dem übergebenen cheerio DOM Objekt
     * @param $
     */
    scrape($: CheerioStatic): Tagesordnung[] {

        const result: Tagesordnung[] = [];

        // Wir suchen die fünfte Tabelle auf der Seite
        const thirdTable = $('table').toArray()[4];

        // 
        const rows = $(thirdTable).find('tr').toArray();

        // Wir iterieren über alle Tabellenzeilen
        // überspringen aber die erste Headline-Zeile
        for(let i=1; i<rows.length; i++) {

            // Lade alle Zellen in dieser Zeile als array
            const cells = $(rows[i]).find('td').toArray();

            // Extrahiere verknüpftes Dokument (text)
            const firstCell = $(cells[0]);
            const dokument = this.extractDokumentDatei(firstCell);

            // Extrahiere Ausschuss
            const ausschuss = this.extractAusschuss(firstCell);
            
            // Extrahiere Datum
            const secondCell = $(cells[1]);
            const thirdCell = $(cells[2]);
            const datum = this.extractDatum(secondCell, thirdCell);

            // 
            result.push({
                type:  'Tagesordnung',
                datum,
                ausschuss,
                dokument
            });
        }

        return result;
    }

    /**
     * Methode extrahiert "Ausschuss" aus der übergebenen Zelle
     * @param cell 
     */
    private extractAusschuss(cell) {
        return cell.find('a').text().trim();
    } 

    /**
     * Methode extrahiert aus den beiden übergebenen Zellen ein Datum
     * bestehend aus Uhrzeit und genauem Tag
     * @param cell1 
     * @param cell2 
     */
    private extractDatum(cell1, cell2) {
        const dateString = cell1.find('p6').text().trim();
        const timeString = cell2.find('b').text().replace(' Uhr', '');
        return dateUtil.parse(`${timeString} ${dateString}`, 'HH:mm DD.MM.YYYY');
    }

    /**
     * Methode extrahiert das verknüpfte "Dokument" aus der übergebenen Zelle
     * @param cell 
     */
    private extractDokumentDatei(cell): Datei {
        const anchor = cell.find('a');
        return {
            type:  "Datei",
            url: anchor.attr("href"),
            titel: anchor.text(),
            mime: "text/html"
        }
    }
}