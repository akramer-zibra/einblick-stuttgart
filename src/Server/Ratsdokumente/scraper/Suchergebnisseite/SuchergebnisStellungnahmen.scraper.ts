import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Datei, Stellungnahme } from '../../../../shared/dokumente';
import { Scraper } from '../../../interfaces.d';

export class SuchergebnisStellungnahmenScraper implements Scraper<Stellungnahme> {

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
    scrape($: CheerioStatic): Stellungnahme[] {

        const result: Stellungnahme[] = [];

        // Wir suchen die vierte Tabelle auf der Seite
        const thirdTable = $('table').toArray()[3];

        // 
        const rows = $(thirdTable).find('tr').toArray();

        // Wir iterieren über alle Tabellenzeilen
        // überspringen aber die erste Headline-Zeile
        for(let i=1; i<rows.length; i++) {

            // Lade alle Zellen in dieser Zeile als array
            const cells = $(rows[i]).find('td').toArray();

            // Extrahiere verknüpftes Dokument (pdf)
            const firstCell = $(cells[0]);
            const dokument = this.extractDokumentDatei(firstCell);

            // Extrahiere referenzierter Antrag
            const refAntrag = this.extractRefAntrag(firstCell);

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
                type:  'Stellungnahme',
                datum,
                betreff,
                fraktionen,
                refAntrag,
                dokument
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
     * Methode extrahiert "Bezeichnung" des referenzierten Antrag aus übergebener Zelle
     * @param cell 
     */
    private extractRefAntrag(cell): string {
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
            mime: "application/pdf"
        }
    }
}