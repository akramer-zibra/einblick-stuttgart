import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Beratungsunterlage, Datei } from '../../../../shared/dokumente';
import { Scraper } from '../../../index.d';

export class SuchergebnisBunterlagenScraper implements Scraper<Beratungsunterlage> {

    /** url path */
    private urlPath: string;

    /**
     * Konstruktor
     */
    constructor(urlPath: string = 'https://www.domino1.stuttgart.de/web/ksd/ksdRedSystem.nsf') {

        // Initiale Parameter
        this.urlPath = urlPath;

        // Wir benutzen Deutsch als locale fpr die Datumsformatierung
        dateUtil.locale("de");
    };

    /**
     * Methode zieht "Beratungsunterlagen" aus dem übergebenen cheerio Objekt
     * @param $
     */
    scrape($: CheerioStatic): Beratungsunterlage[] {

        const result: Beratungsunterlage[] = [];

        // Wir suchen die erste Tabelle auf der Seite
        const firstTable = $('table').toArray()[0];

        // 
        const rows = $(firstTable).find('tr').toArray();

        // Wir iterieren durch alle Tabellenzeilen
        // übersprichen aber die erste, weil nur Überschriften
        for(let i=1; i<rows.length; i++) {

            // Lade alle Zellen dieser Reihe in ein Array
            const cells = $(rows[i]).find('td').toArray();

            // Extrahiere Bezeichnung
            // und verknüpfte Dokument-Datei
            const firstCell = $(cells[0]);
            const bezeichnung = this.extractBezeichnung(firstCell);
            const dokument = this.extractDokumentDatei(firstCell);

            // Extrahiere Datum
            // und parse es in Date Objekt
            const datum = this.extractDatum($(cells[1]));

            // Extrahiere Titel
            // und Ausschuss
            const thirdCell = $(cells[2]);
            const titel = this.extractTitel(thirdCell);
            const ausschuss = this.extractAusschuss(thirdCell);

            // Extrahiere Anhänge
            const anhaenge = this.extractAnhaenge($, $(cells[3]));

            // Sammle herausgezogenes Datenobjekt 
            result.push({
                type:  "Beratungsunterlage",
                datum,
                bezeichnung,
                titel,
                ausschuss,
                dokument,
                anhaenge
            });
        }

        return result;
    }

    /**
     * Methode extrahiert "Bezeichnung" aus übergebener Zelle
     * @param cell 
     */
    private extractBezeichnung(cell): string {
        const anchor = cell.find('a');
        return anchor.text().replace('Drucksache ', 'GRDrs ');
    }

    /**
     * Methode extrahiert verknüpfte "Vorlage" Datei aus übergebener Zelle
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

    /**
     * Methode extrahiert "Datum" aus übergebener Zelle
     * @param cell 
     */
    private extractDatum(cell) {
        const dateString = cell.find('p6').text().trim();
        return dateUtil.parse(dateString, 'DD.MM.YYYY');
    } 

    /**
     * Methode extrahiert "Titel" aus übergebener Zelle
     * @param cell 
     */
    private extractTitel(cell) {
        return cell.find('b').text().trim();
    } 

    /**
     * Methode extrahiert "Ausschuss" aus übergebener Zelle
     * @param cell 
     */
    private extractAusschuss(cell) {
        const secondColumnTextLines = cell.find('p6').text().split("\n");    // Split Text into lines
        return secondColumnTextLines[secondColumnTextLines.length - 2];        // We need to skip last newline
    }

    /**
     * Methode extrahiert alle verknüpften "Anhänge" aus übergebener Zelle
     * @param $ 
     * @param cell 
     */
    private extractAnhaenge($, cell): Datei[] {
        const attachmentAnchors = cell.find('a').toArray();
        const anhaenge: any = [];

        attachmentAnchors.forEach((anchor) => {
            anhaenge.push({
                type:  "Datei",
                url: this.urlPath + $(anchor).attr('href').replace('./.', ''),  // Remove broken path prefix and append with url path
                titel: $(anchor).text(),
                mime: "application/pdf"
            });
        });

        return anhaenge;
    }
}