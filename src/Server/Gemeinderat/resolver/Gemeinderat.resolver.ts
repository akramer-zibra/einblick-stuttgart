import cheerio from 'cheerio';
import { Resolver } from '../../interfaces';
import { GemeinderatClient } from '../data/html/GemeinderatClient';
import { GemeinderatWahldaten } from '../data/static/GemeinderatWahldaten';
import { UebersichtPersonenScraper } from '../scraper/UebersichtPersonen.scraper';

export class GemeinderatResolver implements Resolver {

    /** Referenz zu abhängigen Objekten werden im Konstruktor direkt gesetzt */
    
    /**
     * Factory Methode lädt Abhängigkeiten aus übergebenem IoC container
     * @param container 
     */
    static build(container) {
        return new GemeinderatResolver(container.GemeinderatClient,
                                       container.UebersichtPersonenScraper,
                                       container.GemeinderatWahldaten);
    } 

    /**
     * Konstruktor
     * @param htmlClient
     */
    private constructor(private htmlClient: GemeinderatClient,
                        private uebersichtPersonenScraper: UebersichtPersonenScraper,
                        private gemeinderatWahldaten: GemeinderatWahldaten) {
    }

    /**
     * Methode löst die entsprechende GraphQL query auf
     */
    async resolve() {

        // Wir lassen den HTML Client alle Gemeinderatsmitglieder laden
        const bodyHtml = await this.htmlClient.getMitgliederGemeinderat();

        // Parse die HTTP Antwort mit cheerio
        const $ = cheerio.load(bodyHtml);     // Wir parsen den DOM, um auf die HTML Daten einfache rzugreifen zu können

        // Scrape Mitglieder und gib die Arraycollection weiter
        return this.uebersichtPersonenScraper.scrape($);
    }

    /**
     * Methode liefert Wahldaten des Stuttgarter Gemeinderats 
     */
    resolveGemeinderatWahldaten() {
        return this.gemeinderatWahldaten.getWahldaten();
    }
}