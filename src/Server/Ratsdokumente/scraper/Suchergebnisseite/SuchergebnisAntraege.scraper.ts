import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Datei, Antrag } from '../../../../shared/dokumente';
import { Scraper } from '../../../index.d';

export class SuchergebnisAntraegeScraper implements Scraper<Antrag> {

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
    scrape($: CheerioStatic): Antrag[] {

        const result: Antrag[] = [];

        // Wir suchen die dritte Tabelle auf der Seite
        const thirdTable = $('table').toArray()[2];

        // 
        const rows = $(thirdTable).find('tr').toArray();

        // Wir iterieren über alle Tabellenzeilen
        // überspringen aber die erste Headline-Zeile
        for(let i=1; i<rows.length; i++) {

            // Lade alle Zellen in dieser Zeile als array
            const cells = $(rows[i]).find('td').toArray();

            // Extrahiere Bezeichnung
            const firstCell = $(cells[0]);
            const bezeichnung = this.extractBezeichnung(firstCell);

            // ...und verknüpfte Datei
            const dokument = this.extractDokumentDatei(firstCell);

            // Extrahiere Datum
            const secondCell = $(cells[1]); 
            const datum = this.extractDatum(secondCell);

            // Extrahiere Betreff
            const thirdCell = $(cells[2]); 
            const betreff = this.extractBetreff(thirdCell);

            // Extrahiere Fraktionen
            const fraktionen = this.extractFraktionen(thirdCell);

            // 
            result.push({
                type:  'Antrag',
                bezeichnung,
                datum,
                betreff,
                fraktionen,
                dokument,
            });
        }

        return result;
    }

    /**
     * Methode extrahiert "Betreff" aus der übergebenen Zelle
     * @param cell 
     */
    private extractBetreff(cell) {
        return cell.find('b').text().trim();
    } 

    /**
     * Methode extrahiert "bezeichnung" aus übergebener Zelle
     * @param cell 
     */
    private extractBezeichnung(cell): string {
        const idAnchor = cell.find('a');
        return idAnchor.text().split(' ').pop();
    }

    /**
     * Methode extrahiert "Datum" aus der übergebenen Zelle
     * @param cell 
     */
    private extractDatum(cell) {
        const dateString = cell.find('p6').text().trim();
        return dateUtil.parse(dateString, 'DD.MM.YYYY');
    } 

    /**
     * Methode extrahiert "Fraktionen" aus der übergebenen Zelle
     * @param cell 
     */
    private extractFraktionen(cell) {
        const secondColumnTextLines = cell.find('p6').text().split("\n");    // Split Text into lines
        return secondColumnTextLines[secondColumnTextLines.length - 2];        // We need to skip last newline
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