import cheerio from 'cheerio';
import { KsdSucheClient } from "../Ratsdokumente/data/KsdSucheClient";
import { SuchergebnisBunterlagenScraper } from "../Ratsdokumente/scraper/SuchergebnisBunterlagen.scraper";
import { SuchergebnisProtokolleScraper } from '../Ratsdokumente/scraper/SuchergebnisProtokolle.scraper';

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

        /* Scrape retrieved bodyHTML */
        // ..scrape "Beratungsunterlagen"
        const berScraper = new SuchergebnisBunterlagenScraper();
        const bunterlagenArr = berScraper.scrape($);

        // ..scrape "Protokolle"
        const proScraper = new SuchergebnisProtokolleScraper();
        const proArr = proScraper.scrape($);


        console.log(proArr);

        // TODO scrape other data from search result...

        // TODO merge scraped result arrays

        // Transform
        // const transformedData = this.transform(beratungsunterlagenArr);

        // Return...
        return bunterlagenArr;
    }
}