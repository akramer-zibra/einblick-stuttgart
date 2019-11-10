import { GemeinderatClient } from "./data/html/GemeinderatClient";
import { GemeinderatWahldaten } from "./data/static/GemeinderatWahldaten";
import { GemeinderatResolver } from "./resolver/Gemeinderat.resolver";
import { UebersichtPersonenScraper } from "./scraper/UebersichtPersonen.scraper";

/**
 * Factory Methode für dieses Modul
 */
export = (container) => {

    // Wir definieren hier alle Services und deren Factories
    // Resolver
    container.bottle.factory('GemeinderatResolver', GemeinderatResolver.build);
    // Scraper
    container.bottle.service('UebersichtPersonenScraper', UebersichtPersonenScraper);
    // Datenquellen
    container.bottle.service('GemeinderatClient', GemeinderatClient);
    container.bottle.service('GemeinderatWahldaten', GemeinderatWahldaten);
}