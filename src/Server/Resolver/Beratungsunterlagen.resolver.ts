import cheerio from 'cheerio';
import { KsdSucheClient } from "../Ratsdokumente/data/KsdSucheClient";
import { SuchergebnisBunterlagenScraper } from '../Ratsdokumente/scraper/SuchergebnisBunterlagen.scraper';

export class BeratungsunterlagenResolver {

    /**
     * Method resolves data for timeline API
     * @param searchText 
     */
    async resolve(searchText: string) {

        // We use "Suche" client
        const ksdSucheClient = new KsdSucheClient();

        // 
        const bodyHtml = await ksdSucheClient.submitSearch(searchText);
        
        // Parse html with cheerio
        const $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        // Scrape retrieved bodyHTML
        const berScraper = new SuchergebnisBunterlagenScraper();
        const beratungsunterlagenArr = berScraper.scrape($);

        // ..simply return scraped data
        return beratungsunterlagenArr;
    }
}