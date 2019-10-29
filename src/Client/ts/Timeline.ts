import { GraphQLClient } from "./GraphQLClient";
import gql from "graphql-tag";

declare const TL: any;  // Declares global TL object integrated with linked script file in index.html

export class Timeline {

    /** Reference to this page's timeline object */
    private timeline: any;

    /** Reference to graphQL client */
    private graphQLClient: GraphQLClient = new GraphQLClient();

    constructor() {
        console.log('Timeline initialisiert...');

        // 
        this.graphQLClient = new GraphQLClient();

        // TEST
        this.graphQLClient.client
            .query({
                query: gql`
                    query {
                        timelineAll(search:"Stuttgart 28") {
                            events {
                                media {url, caption}
                                start_date {year, month, day}
                                text {headline, text}
                            }
                        }
                    }`
            })
            .then(result => {
                console.log(result)
            
                // Update Timeline
                this.update(result.data.timelineAll);
            });
            // TEST

    }
    
    /**
     * Method updates timeline with given object
     * @param timelineJson 
     */
    update(timelineJson: any) {

        // Create a new Timeline object with given JSON
        this.timeline = new TL.Timeline('timeline-embed', timelineJson, {
                start_at_end: true,
                timenav_height: 300,
                language: 'de',
                timenav_position: 'bottom',
                hash_bookmark: true
            });
    }
}