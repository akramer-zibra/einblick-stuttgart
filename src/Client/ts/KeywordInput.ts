import $ from "jquery";
import gql from "graphql-tag";
import { GraphQLClient } from "./GraphQLClient";
import { Timeline } from "./Timeline";
import { ErrorFeedback } from "./ErrorFeedback";

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

            // Call API 
            this.apiCall(keyword)
                .then((timelineJson) => {

                    // Update Timeline
                    this.timeline.update(timelineJson);
                })
                .catch(this.handleError);
        });
    }

    /**
     * Method calls GraphQL APi for timeline events
     */
    private apiCall(keyword: string): Promise<any> {

        return new Promise((resolve, reject) => {

            $('.pageloader').addClass('is-active');

            // Load timeline events from GraphQL API
            this.graphQLClient.client
                .query({
                    query: gql`
                        query TimelineByKeyword($keyword: String!) {
                            timelineByKeyword(search: $keyword) {
                                events {
                                    media {url}
                                    start_date {year, month, day}
                                    text {headline, text}
                                }
                            }
                        }`,
                    variables: {
                        keyword
                    } 
                })
                .then(result => {
                    $('.pageloader').removeClass('is-active');
                    resolve(result.data.timelineByKeyword);
                })
                .catch(err => {
                    $('.pageloader').removeClass('is-active');
                    reject(err);
                });
        });
    }

    /**
     * Method handles error 
     * @param err 
     */
    private handleError(err) {

        // Show error
        ErrorFeedback.showErrorToast(err);
    }
}