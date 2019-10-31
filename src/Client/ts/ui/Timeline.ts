declare const TL: any;  // Declares global TL object integrated with linked script file in index.html
import { GraphQLClient } from "../data/GraphQLClient";
import { TimelineData, TimelineSlide } from "../../timeline";

export class Timeline {

    /** Reference to graphQL client */
    private graphQLClient: GraphQLClient = new GraphQLClient();

    constructor() {
        console.log('Timeline initialisiert...');
    }
    
    /**
     * Method updates timeline with given object
     * @param timelineJson 
     */
    update(timelineJson: any) {

        // Create a new Timeline object with given JSON
        new TL.Timeline('timeline-embed', timelineJson, {
                start_at_end: true,
                timenav_height: 300,
                language: 'de'
            });
    }

    /**
     * Method takes api data and updates timeline with a transformed structure
     * @param apiRatsdokumente 
     */
    updateWithApiData(apiRatsdokumente: any) {
        const timelineData = this.transform(apiRatsdokumente);
        this.update(timelineData);
    }

    /**
     * Method converts retrieved API data to TimelineData 
     * @param apiRatsdokumente 
     */
    private transform(apiRatsdokumente: any): TimelineData {

        const slides: TimelineSlide[] = [];

        // We convert each ratsdokument into a timeline event
        apiRatsdokumente.forEach((ratsdokument) => {

            slides.push({
                start_date: {
                    year: ratsdokument.getFullYear(), 
                    month: ratsdokument.getMonth(),
                    day: ratsdokument.getDay()
                },
                media: {
                    url: "/static/img/beratungsunterlage-200x.png",
                    link: ratsdokument.vorlage.url,
                    link_target: "_blank"
                },
                text: {
                    headline: ratsdokument.titel,
                    text: `${ratsdokument.ausschuss}`
                }
            });
        });

        return { events: slides };
    } 
}