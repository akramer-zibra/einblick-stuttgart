import $ from "jquery";
import gql from "graphql-tag";
import { GraphQLClient } from "./GraphQLClient";
import { Timeline } from "./Timeline";

export class KeywordInput {

    /** Dependencies references */
    private graphQLClient: GraphQLClient;
    private timeline: Timeline;

    /**
     * Constructor method
     * @param timeline 
     */
    constructor(graphQLClient: GraphQLClient, timeline: Timeline) {

        // Dependency injection
        this.graphQLClient = graphQLClient;
        this.timeline = timeline;

        // Define event listener for click events
        $('.act__keyword').on('click', (event) => {

            // Get keyword from tag text
            const keyword = $(event.target).text();

            console.log(keyword);

            // Call API 
            const timelineJson = this.apiCall(keyword);

            // Update Timeline
//            this.timeline.update(timelineJson);
        });
    }

    /**
     * Method calls GraphQL APi for timeline events
     */
    private apiCall(keywordText: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Load timeline events from GraphQL API
            this.graphQLClient.client
                .query({
                    query: gql`
                        query {
                            timelineByKeyword(search: $keywordText) {
                                events {
                                    media {url}
                                    start_date {year, month, day}
                                    text {headline, text}
                                }
                            }
                        }`
                }, {
                    variables: {
                        keywordText
                    }
                })
                .then(result => {
                    resolve(result.data.timelineAll);
                })
                .catch(err => reject(err));
        });
    }
}