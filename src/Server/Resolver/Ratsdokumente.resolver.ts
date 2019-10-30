import cheerio from 'cheerio';
import { KsdSucheClient } from "../Ratsdokumente/data/KsdSucheClient";
import { SuchergebnisBunterlagenScraper } from "../Ratsdokumente/scraper/SuchergebnisBunterlagen.scraper";
import { Buchungsunterlage, Dokumenttyp } from "../Ratsdokumente/dokumente";

export class RatsdokumenteResolver {

    /**
     * Method resolves query with given parameter
     * @param suchbegriff 
     */
    async resolve(suchbegriff: string) {

        // We use client instance
        const ksdSucheClient = new KsdSucheClient();

        // We submit a search with given searchstring
        const bodyHtml = await ksdSucheClient.submitSearch(suchbegriff);
        
        // Parse html with cheerio
        const $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        // Scrape retrieved bodyHTML
        const berScraper = new SuchergebnisBunterlagenScraper();
        const bunterlagenArr = berScraper.scrape($);

        // TODO scrape other data from search result...

        // TODO merge scraped result arrays

        // Transform
        // const transformedData = this.transform(beratungsunterlagenArr);

        // Return...
        return bunterlagenArr;
    }
}