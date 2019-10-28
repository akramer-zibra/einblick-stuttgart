import { KsdSucheClient } from "../DataSources/Ratsdokumente/KsdSucheClient";

export class TimelineResolver {

    /**
     * Method resolves data for timeline API
     * @param search 
     */
    public async resolve(search: string) {

        // DEBUG
        console.log(search);
        // DEBUG

        // We use "Suche" client
        let ksdSucheClient = new KsdSucheClient();

        // 
        let bodyHtml = await ksdSucheClient.submitSearch('Stuttgart 28');
            
        // Scrape retrieved bodyHTML
        

        // TEST
        console.log(bodyHtml);
        // TEST      



        // Returns simple demo data
        // @see https://timeline.knightlab.com/docs/json-format.html
        return {
            "title": {
                "media": {
                    "url": "//www.flickr.com/photos/tm_10001/2310475988/",
                    "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
                    "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
                },
                "text": {
                    "headline": "Whitney Houston<br/> 1963 - 2012",
                    "text": "<p>Houston's voice caught the imagination of the world propelling her to superstardom at an early age becoming one of the most awarded performers of our time. This is a look into the amazing heights she achieved and her personal struggles with substance abuse and a tumultuous marriage.</p>"
                }
            }, 
            "events": [{
                "media": {
                    "url": "https://youtu.be/5Fa09teeaqs",
                    "caption": "CNN looks back at Houston's iconic performance of the national anthem at Superbowl XXV.",
                    "credit": "CNN"
                },
                "start_date": {
                    "year": "1991"
                },
                "text": {
                    "headline": "Super Bowl",
                    "text": "Houston's national anthem performance captures the hearts and minds of Americans ralllying behind soldiers in the Persian Guf War."
                }
            },{
                "media": {
                    "url": "https://youtu.be/5Fa09teeaqs",
                    "caption": "CNN looks back at Houston's iconic performance of the national anthem at Superbowl XXV.",
                    "credit": "CNN"
                },
                "start_date": {
                    "year": "1999"
                },
                "text": {
                    "headline": "Super Bowl",
                    "text": "Houston's national anthem performance captures the hearts and minds of Americans ralllying behind soldiers in the Persian Guf War."
                }
            }]
        }        
    }
}