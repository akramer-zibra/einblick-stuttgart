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

            // Start with default slide 
            let slide: TimelineSlide = {
                start_date: {
                    year: ratsdokumentDatum.getFullYear(), 
                    month: ratsdokumentDatum.getMonth(),
                    day: ratsdokumentDatum.getDay()
                },
                text: {
                    headline: ratsdokument.class
                }
            };

            // Give this slide a class depending look
            slide = this.classDependingLook(slide, ratsdokument);

            // 
            slides.push(slide);
        });

        return { events: slides };
    } 

    /**
     * Methode generates class depending slide look
     * @param dokument 
     */
    private classDependingLook(slide: TimelineSlide, dokument): TimelineSlide {
        if(dokument.class === "Beratungsunterlage") {

            slide.media = {
                url: "/static/img/beratungsunterlage-200x.png",
                link: dokument.vorlage.url,
                link_target: "_blank"
            },
            slide.text.text = `<a href="${dokument.vorlage.url}" target="_blank">${dokument.id} <i class="fas fa-external-link-alt"></i></a>
                                <br /><strong>${dokument.titel}</strong>
                                <br />${dokument.ausschuss}`;

        } else if(dokument.class === "Protokoll") {

            slide.media = {
                url: "/static/img/protokoll-200x.png",
                link: dokument.protokoll.url,
                link_target: "_blank"
            },
            slide.text.text = `<a href="${dokument.protokoll.url}" target="_blank">${dokument.id} <i class="fas fa-external-link-alt"></i></a>
                                <br /><strong>${dokument.titel}</strong>
                                <br />${dokument.ausschuss}`;
        }
        throw new Error("Es wurde ein Dokumententyp gefunden, der nicht unterstützt wird: "+ dokument.class);
    }
}