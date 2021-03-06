import cheerio from 'cheerio';
import { Ratsdokument } from '../../../shared/ratsdokumente';
import { Resolver } from '../../interfaces';
import { RatsdokumenteHtmlClient } from "../data/html/RatsdokumenteHtmlClient";
import { SuchergebnisAntraegeScraper } from '../scraper/Suchergebnisseite/SuchergebnisAntraege.scraper';
import { SuchergebnisBunterlagenScraper } from "../scraper/Suchergebnisseite/SuchergebnisBunterlagen.scraper";
import { SuchergebnisProtokolleScraper } from '../scraper/Suchergebnisseite/SuchergebnisProtokolle.scraper';
import { SuchergebnisStellungnahmenScraper } from '../scraper/Suchergebnisseite/SuchergebnisStellungnahmen.scraper';
import { SuchergebnisTagesordnungenScraper } from '../scraper/Suchergebnisseite/SuchergebnisTagesordnungen.scraper';

export class RatsdokumenteResolver implements Resolver {

    /** Referenz zu abhängigen Objekten werden im Konstruktor direkt gesetzt */
    
    /**
     * Factory Methode lädt Abhängigkeiten aus übergebenem IoC container
     * @param container 
     */
    static build(container) {
        return new RatsdokumenteResolver(container.RatsdokumenteHtmlClient,
                                        container.SuchergebnisBunterlagenScraper,
                                        container.SuchergebnisProtokolleScraper,
                                        container.SuchergebnisAntraegeScraper,
                                        container.SuchergebnisStellungnahmenScraper,
                                        container.SuchergebnisTagesordnungenScraper);
    } 

    /**
     * Konstruktor
     * @param htmlClient 
     * @param bunterlagenScraper 
     * @param protokollScraper 
     * @param antragScraper 
     * @param stellungnahmenScraper 
     * @param tagesordnungenScraper 
     */
    private constructor(private htmlClient: RatsdokumenteHtmlClient,
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
     * @param dokumenttypen
     */
    async resolve(suchbegriff: string, dokumenttypen: string[]) {

        // Wir benutzen hier eine spezielle Client Instanz für die Suchefunktion
        // und führe die Suche mit unserem Parameter aus 
        const bodyHtml = await this.htmlClient.submitSearch(suchbegriff);

        // Parse die HTTP Antwort mit cheerio
        const $ = cheerio.load(bodyHtml);     // Wir parsen den DOM, um auf die HTML Daten einfache rzugreifen zu können

        /* Scrape das abgefragte HTML */
        // Initialisiere Variable um ge-scrapte Daten zu sammeln
        const collectedDataArr: Ratsdokument[][] = [];

        // ..scrape "Beratungsunterlagen"
        if(dokumenttypen === undefined || dokumenttypen.indexOf('*') >= 0 || dokumenttypen.indexOf('Beratungsunterlage') >= 0) {
            collectedDataArr.push(this.bunterlagenScraper.scrape($));
        }

        // ..scrape "Protokolle"
        if(dokumenttypen === undefined || dokumenttypen.indexOf('*') >= 0 || dokumenttypen.indexOf('Protokoll') >= 0) {
            collectedDataArr.push(this.protokollScraper.scrape($));
        }

        // ..scrape "Anträge"
        if(dokumenttypen === undefined || dokumenttypen.indexOf('*') >= 0 || dokumenttypen.indexOf('Antrag') >= 0) {
            collectedDataArr.push(this.antragScraper.scrape($));
        }

        // ..scrape "Stellungnahmen"
        if(dokumenttypen === undefined || dokumenttypen.indexOf('*') >= 0 || dokumenttypen.indexOf('Stellungnahme') >= 0) {
            collectedDataArr.push(this.stellungnahmenScraper.scrape($));
        }

        // ..scrape "Tagesordnungen"
        if(dokumenttypen === undefined || dokumenttypen.indexOf('*') >= 0 || dokumenttypen.indexOf('Tagesordnung') >= 0) {
            collectedDataArr.push(this.tagesordnungenScraper.scrape($));
        }

        const mergedResult = this.merge(collectedDataArr);

        // Zusammengeführtes Array mit Ergebnissen zurückgeben
        return mergedResult;
    }

    /**
     * Methode führt die übergebenen Arrays in ein gemeinsames Array zusammen
     * NOTICE berücksichtigt keine Reihenfolge in den Arrays
     * @param ratsdokumente Arrays aus Ratsdokumenten
     */
    private merge(ratsdokumente: any[]): Ratsdokument[] {

        // Falls das Ergebnis leer ist
        if(ratsdokumente.length === 0) { return []; }

        // Falls der Algorithmus nur eine Ergebnismenge liefert, brauchen wir nicht zu reduzieren
        if(ratsdokumente.length === 1) { return ratsdokumente[0]; } 

        // Wir benutzen hier die reduce Methode um ein einziges Arrays mit allen Elementen zu erzeugen
        return ratsdokumente.reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue);
        });
    }
}