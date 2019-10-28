import cheerio from 'cheerio';
import { KsdSucheClient } from "../DataSources/Ratsdokumente/KsdSucheClient";
import { BeratungsunterlagenScraper } from '../DataSources/Ratsdokumente/Scraper/BeratungsunterlagenScraper';

export class BeratungsunterlagenResolver {

    /**
     * Method resolves data for timeline API
     * @param searchText 
     */
    public async resolve(searchText: string) {

        // We use "Suche" client
        let ksdSucheClient = new KsdSucheClient();

        // 
        let bodyHtml = await ksdSucheClient.submitSearch(searchText);
        
        // Parse html with cheerio
        let $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        // Scrape retrieved bodyHTML
        let berScraper = new BeratungsunterlagenScraper();
        let beratungsunterlagenArr = berScraper.scrape($);

        // ..simply return scraped data
        return beratungsunterlagenArr;
    }
}