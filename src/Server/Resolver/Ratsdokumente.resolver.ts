import cheerio from 'cheerio';
import { KsdSucheClient } from "../Ratsdokumente/data/KsdSucheClient";
import { SuchergebnisBunterlagenScraper } from "../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisBunterlagen.scraper";
import { SuchergebnisProtokolleScraper } from '../Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisProtokolle.scraper';
import { Beratungsunterlage, Protokoll } from '../Ratsdokumente/dokumente';

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
        const bunterlagenScraper = new SuchergebnisBunterlagenScraper();
        const bunterlagenArr = bunterlagenScraper.scrape($);

        // ..scrape "Protokolle"
        const protokollScraper = new SuchergebnisProtokolleScraper();
        const protokollArr = protokollScraper.scrape($);

        // TODO scrape other data from search result...

        const mergedResult = this.merge([bunterlagenArr, protokollArr]);

        // Return merge result
        return mergedResult;
    }

    /**
     * Method merges given arrays to one single array
     * NOTICE does not consider ordering
     * @param ratsdokumente Arrays with either Beratungsunterlagen OR Protokollen
     */
    private merge(ratsdokumente: any[]): Array<Beratungsunterlage|Protokoll> {

        // We use array reduce to merge given arrays
        return ratsdokumente.reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue);
        });
    }
}