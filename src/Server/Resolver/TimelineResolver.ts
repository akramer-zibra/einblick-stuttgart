import cheerio from 'cheerio';
import { KsdSucheClient } from "../DataSources/Ratsdokumente/KsdSucheClient";
import { SuchergebnisBunterlagenScraper } from '../DataSources/Ratsdokumente/Scraper/SuchergebnisBunterlagenScraper';

export class TimelineResolver {

    /**
     * Method resolves data for timeline API
     * @param searchText 
     */
    public async resolve(searchText: string) {

        // Define response object stub
        // @see https://timeline.knightlab.com/docs/json-format.html
        let response: any = {
            "title": {
                "text": {
                    "headline": "Suche: "+ searchText,
                    "text": "<p>Alles was wir dazu finden können</p>"
                }
            }, 
            "events": []
        } 

        // We use "Suche" client
        let ksdSucheClient = new KsdSucheClient();

        // 
        let bodyHtml = await ksdSucheClient.submitSearch(searchText);
        
        // Parse html with cheerio
        let $ = cheerio.load(bodyHtml);     // We parse dom here an pass dom to scrapers instead of HTML string

        // Scrape retrieved bodyHTML
        let buchScraper = new SuchergebnisBunterlagenScraper();
        let beratungsunterlagenArr = buchScraper.scrape($);

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