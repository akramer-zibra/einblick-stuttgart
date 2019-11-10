import { RatsdokumenteHtmlClient } from "./data/html/RatsdokumenteHtmlClient";
import { RatsdokumenteResolver } from "./resolver/Ratsdokumente.resolver";
import { SuchergebnisAntraegeScraper } from "./scraper/Suchergebnisseite/SuchergebnisAntraege.scraper";
import { SuchergebnisBunterlagenScraper } from "./scraper/Suchergebnisseite/SuchergebnisBunterlagen.scraper";
import { SuchergebnisProtokolleScraper } from "./scraper/Suchergebnisseite/SuchergebnisProtokolle.scraper";
import { SuchergebnisStellungnahmenScraper } from "./scraper/Suchergebnisseite/SuchergebnisStellungnahmen.scraper";
import { SuchergebnisTagesordnungenScraper } from "./scraper/Suchergebnisseite/SuchergebnisTagesordnungen.scraper";

/**
 * factory Methode für Ratsdokumente Modul
 */
export = (container) => {

    // Definiere hier alle Services und deren Factories
    // Resolver
    container.bottle.factory('RatsdokumenteResolver', RatsdokumenteResolver.build);
    // Scraper
    container.bottle.service('SuchergebnisBunterlagenScraper', SuchergebnisBunterlagenScraper);
    container.bottle.service('SuchergebnisProtokolleScraper', SuchergebnisProtokolleScraper);
    container.bottle.service('SuchergebnisAntraegeScraper', SuchergebnisAntraegeScraper);
    container.bottle.service('SuchergebnisStellungnahmenScraper', SuchergebnisStellungnahmenScraper);
    container.bottle.service('SuchergebnisTagesordnungenScraper', SuchergebnisTagesordnungenScraper);
    // Datenquelle
    container.bottle.service('RatsdokumenteHtmlClient', RatsdokumenteHtmlClient);
}