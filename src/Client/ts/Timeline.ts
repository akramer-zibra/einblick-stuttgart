import { GraphQLClient } from "./GraphQLClient";

declare const TL: any;  // Declares global TL object integrated with linked script file in index.html

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
                language: 'de',
                timenav_position: 'bottom',
                hash_bookmark: true
            });
    }
}