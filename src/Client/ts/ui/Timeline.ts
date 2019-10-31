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

            // deserialize "datum" into DateTime object
            const ratsdokumentDatum = new Date(ratsdokument.datum);

            slides.push({
                start_date: {
                    year: ratsdokumentDatum.getFullYear(), 
                    month: ratsdokumentDatum.getMonth(),
                    day: ratsdokumentDatum.getDay()
                },
                media: {
                    url: "/static/img/beratungsunterlage-200x.png",
                    link: ratsdokument.vorlage.url,
                    link_target: "_blank"
                },
                text: {
                    headline: this.cut(ratsdokument.titel),
                    text: `<a href="${ratsdokument.vorlage.url}" target="_blank">${ratsdokument.id}</a><br />${ratsdokument.ausschuss}`
                }
            });
        });

        return { events: slides };
    } 

    /**
     * Method cuts string texts to a certain length
     * @param text 
     * @param length 
     */
    private cut(text: string, length = 40) {
        return (text.length > length) 
        ? text.substr(0, length) + '...'
        : text;
    }
}