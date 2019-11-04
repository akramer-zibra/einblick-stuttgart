import cheerio from 'cheerio';
import { Antrag, Beratungsunterlage, Protokoll, Stellungnahme, Tagesordnung } from '../../shared/dokumente';
import { Resolver } from '../interfaces.d';
import { KsdSucheClient } from "../Ratsdokumente/data/html/KsdSucheClient";
import { SuchergebnisAntraegeScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisAntraege.scraper';
import { SuchergebnisBunterlagenScraper } from "../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisBunterlagen.scraper";
import { SuchergebnisProtokolleScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisProtokolle.scraper';
import { SuchergebnisStellungnahmenScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisStellungnahmen.scraper';
import { SuchergebnisTagesordnungenScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisTagesordnungen.scraper';

export class RatsdokumenteResolver implements Resolver {

    /** Referenz zu abhängigen Objekten werden im Konstruktor direkt gesetzt */
    
    /**
     * Factory Methode lädt Abhängigkeiten aus übergebenem IoC container
     * @param container 
     */
    static build(container) {
        return new RatsdokumenteResolver(container.KsdSucheClient,
                                        container.SuchergebnisBunterlagenScraper,
                                        container.SuchergebnisProtokolleScraper,
                                        container.SuchergebnisAntraegeScraper,
                                        container.SuchergebnisStellungnahmenScraper,
                                        container.SuchergebnisTagesordnungenScraper);
    } 

    /**
     * Konstruktor
     * @param ksdSucheClient 
     * @param bunterlagenScraper 
     * @param protokollScraper 
     * @param antragScraper 
     * @param stellungnahmenScraper 
     * @param tagesordnungenScraper 
     */
    private constructor(private ksdSucheClient: KsdSucheClient,
                        private bunterlagenScraper: SuchergebnisBunterlagenScraper,
                        private protokollScraper: SuchergebnisProtokolleScraper,
                        private antragScraper: SuchergebnisAntraegeScraper,
                        private stellungnahmenScraper: SuchergebnisStellungnahmenScraper,
                        private tagesordnungenScraper: SuchergebnisTagesordnungenScraper,
                        ) {
    }

    /**
     * Methode löst die entsprechende GraphQL query mit dem übergebenen Parameter auf
     * @param suchbegriff 
     */
    async resolve(suchbegriff: string) {

        // Wir benutzen hier eine spezielle Client Instanz für die Suchefunktion
        // und führe die Suche mit unserem Parameter aus 
        const bodyHtml = await this.ksdSucheClient.submitSearch(suchbegriff);

        // Parse die HTTP Antwort mit cheerio
        const $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        /* Scrape das abgefragte HTML */
        // ..scrape "Beratungsunterlagen"
        const bunterlagenArr = this.bunterlagenScraper.scrape($);

        // ..scrape "Protokolle"
        const protokollArr =this.protokollScraper.scrape($);

        // ..scrape "Anträge"
        const antraegeArr = this.antragScraper.scrape($);

        // ..scrape "Stellungnahmen"
        const stellungnahmenArr = this.stellungnahmenScraper.scrape($);

        // ..scrape "Tagesordnungen"
        const tagesordnungenArr = this.tagesordnungenScraper.scrape($);

        const mergedResult = this.merge([bunterlagenArr, protokollArr, antraegeArr, stellungnahmenArr, tagesordnungenArr]);

        // Zusammengeführtes Array mit Ergebnissen zurückgeben
        return mergedResult;
    }

    /**
     * Methode führt die übergebenen Arrays in ein gemeinsames Array zusammen
     * NOTICE berücksichtigt keine Reihenfolge in den Arrays
     * @param ratsdokumente Arrays aus Ratsdokumenten
     */
    private merge(ratsdokumente: any[]): Array<Beratungsunterlage|Protokoll|Antrag|Stellungnahme|Tagesordnung> {

        // Wir benutzen hier die reduce Methode um ein einziges Arrays mit allen Elementen zu erzeugen
        return ratsdokumente.reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue);
        });
    }
}