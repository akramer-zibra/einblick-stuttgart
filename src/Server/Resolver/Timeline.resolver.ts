import cheerio from 'cheerio';
import { KsdSucheClient } from "../DataSources/Ratsdokumente/KsdSucheClient";
import { SuchergebnisBunterlagenScraper } from '../DataSources/Ratsdokumente/Scraper/SuchergebnisBunterlagen.scraper';

export class TimelineResolver {

    /**
     * Method resolves data for timeline API
     * @param searchText 
     */
    async resolve(searchText: string) {

        // Define response object stub
        // @see https://timeline.knightlab.com/docs/json-format.html
        const response: any = {
            "title": {
                "text": {
                    "headline": "Suche: "+ searchText,
                    "text": "<p>Alles was wir dazu finden können</p>"
                }
            }, 
            "events": []
        } 

        // We use "Suche" client
        const ksdSucheClient = new KsdSucheClient();

        // 
        const bodyHtml = await ksdSucheClient.submitSearch(searchText);
        
        // Parse html with cheerio
        const $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        // Scrape retrieved bodyHTML
        const buchScraper = new SuchergebnisBunterlagenScraper();
        const beratungsunterlagenArr = buchScraper.scrape($);

        // Push each "Beratungsunterlage" into response object
        beratungsunterlagenArr.forEach((berObj) => {
            response.events.push({
                "start_date": {
                    "year": berObj.datum.getFullYear(),
                    "month": berObj.datum.getMonth(),
                    "day": berObj.datum.getDay()
                },
                "text": {
                    "headline": berObj.ausschuss,
                    "text": berObj.titel
                }
            });
        });
        
        return response;       
    }
}