import cheerio from 'cheerio';
import { Antrag, Beratungsunterlage, Protokoll, Stellungnahme } from '../../shared/dokumente';
import { Resolver } from '../index.d';
import { KsdSucheClient } from "../Ratsdokumente/data/html3/KsdSucheClient";
import { SuchergebnisAntraegeScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisAntraege.scraper';
import { SuchergebnisBunterlagenScraper } from "../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisBunterlagen.scraper";
import { SuchergebnisProtokolleScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisProtokolle.scraper';
import { SuchergebnisStellungnahmenScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisStellungnahmen.scraper';

export class RatsdokumenteResolver implements Resolver {

    /**
     * Methode löst die entsprechende GraphQL query mit dem übergebenen Parameter auf
     * @param suchbegriff 
     */
    async resolve(suchbegriff: string) {

        // Wir benutzen hier eine spezielle Client Instanz für die Suchefunktion
        const ksdSucheClient = new KsdSucheClient();

        // Führe die Suche mit unserem Parameter aus 
        const bodyHtml = await ksdSucheClient.submitSearch(suchbegriff);

        // Parse die HTTP Antwort mit cheerio
        const $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        /* Scrape das abgefragte HTML */
        // ..scrape "Beratungsunterlagen"
        const bunterlagenScraper = new SuchergebnisBunterlagenScraper();
        const bunterlagenArr = bunterlagenScraper.scrape($);

        // ..scrape "Protokolle"
        const protokollScraper = new SuchergebnisProtokolleScraper();
        const protokollArr = protokollScraper.scrape($);

        // ..scrape "Anträge"
        const antragScraper = new SuchergebnisAntraegeScraper();
        const antraegeArr = antragScraper.scrape($);

        // ..scrape "Stellungnahmen"
        const stellungnahmenScraper = new SuchergebnisStellungnahmenScraper();
        const stellungnahmenArr = stellungnahmenScraper.scrape($);

        // TODO Andere Daten aus der Suchergebnisseite scrapen

        const mergedResult = this.merge([bunterlagenArr, protokollArr, antraegeArr, stellungnahmenArr]);

        // Zusammengeführtes Array mit Ergebnissen zurückgeben
        return mergedResult;
    }

    /**
     * Methode führt die übergebenen Arrays in ein gemeinsames Array zusammen
     * NOTICE berücksichtigt keine Reihenfolge in den Arrays
     * @param ratsdokumente Arrays aus Ratsdokumenten
     */
    private merge(ratsdokumente: any[]): Array<Beratungsunterlage|Protokoll|Antrag|Stellungnahme> {

        // Wir benutzen hier die reduce Methode um ein einziges Arrays mit allen Elementen zu erzeugen
        return ratsdokumente.reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue);
        });
    }
}