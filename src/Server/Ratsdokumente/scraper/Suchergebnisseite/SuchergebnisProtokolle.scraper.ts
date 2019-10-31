import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Protokoll, Datei } from '../../dokumente';

export class SuchergebnisProtokolleScraper {

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
    scrape($: CheerioStatic): Protokoll[] {

        const result: Protokoll[] = [];

        // Wir suchen die zweite Tabelle auf der Seite
        const secondTable = $('table').toArray()[1];

        // 
        const rows = $(secondTable).find('tr').toArray();

        // Wir iterieren über alle Tabellenzeilen
        // überspringen aber die erste Headline-Zeile
        for(let i=1; i<rows.length; i++) {

            // Lade alle Spalten in dieser Zeile als array
            const columns = $(rows[i]).find('td').toArray();

            // Extrahiere Nummer
            // und eine Referenz zur Protokoll-Datei
            const firstCell = $(columns[0]);
            const {top, nnr} = this.extractTopAndNnr(firstCell);
            const protokoll = this.extractProtokollDatei(firstCell);

            // Extrahiere Datum
            // und parse es in ein Date Objekt
            const datum = this.extractDatum($(columns[1]));

            // Extrahiere Betreff 
            // und Ausschuss
            const thirdCell = $(columns[2]);
            const betreff = this.extractBetreff(thirdCell);
            const ausschuss = this.extractAusschuss(thirdCell);

            // Extrahiere Referenz zur passenden "Beratungsunterlage" (GRDrs)
            // NOTICE: dafür muss man das verlinkte PDF scrapen...

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
     * Methode extrahiert "TOP" (Tagesordnungspunkt) und "nnr" (Niederschriftnummer) aus der übergebenen Zelle 
     * @param cell 
     */
    private extractTopAndNnr(cell): {top, nnr} {
        const idAnchor = cell.find('a');
        const tokens = idAnchor.text().split(' ');
        return {top: tokens[1], nnr: tokens.pop()}  // Second token is TOP number, last token is protokoll number
    }

    /**
     * Methode extrahiert "Protokoll"-Datei aus der übergebenen Zelle
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
     * Methode extrahiert "Datum" aus der übergebenen Zelle
     * @param cell 
     */
    private extractDatum(cell) {
        const dateString = cell.find('p6').text().trim();
        return dateUtil.parse(dateString, 'DD.MM.YYYY');
    } 

    /**
     * Methode extrahiert "Titel" aus der übergebenen Zelle
     * @param cell 
     */
    private extractBetreff(cell) {
        return cell.find('b').text().trim();
    } 

    /**
     * Methode extrahiert "Asschuss" aus der übergebenen Zelle
     * @param cell 
     */
    private extractAusschuss(cell) {
        const secondColumnTextLines = cell.find('p6').text().split("\n");    // Split Text into lines
        return secondColumnTextLines[secondColumnTextLines.length - 2];        // We need to skip last newline
    }
}