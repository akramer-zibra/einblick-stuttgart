import $ from "jquery";
import gql from "graphql-tag";
import { GraphQLClient } from "../data/GraphQLClient";
import { Timeline } from "./Timeline";
import { ErrorFeedback } from "./ErrorFeedback";

export class KeywordInput {

    /** Dependencies references */
    private graphQLClient: GraphQLClient;
    private timeline: Timeline;

    /** API call query template */
    private API_CALL_QUERY = gql`
                                query TimelineByKeyword($keyword: String!) {
                                    timelineByKeyword(search: $keyword) {
                                        events {
                                            media {url, link, link_target}
                                            start_date {year, month, day}
                                            text {headline, text}
                                            group
                                        }
                                    }
                                }`;

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

            $('.pageloader').addClass('is-active');

            // Call API 
            this.apiCall(keyword)
                .then((timelineJson) => {

                    $('.pageloader').removeClass('is-active');

                    // TODO scroll to timeline
                    this.scrollToDivider();

                    // Update Timeline
                    this.timeline.update(timelineJson);
                })
                .catch(err => {
                    $('.pageloader').removeClass('is-active');
                    this.handleError(err) 
                });
        });
    }

    /**
     * Method calls GraphQL APi for timeline events
     */
    private apiCall(keyword: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Load timeline events from GraphQL API
            this.graphQLClient.client
                .query({
                    query: this.API_CALL_QUERY,
                    variables: {
                        keyword
                    } 
                })
                .then(result => {
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
        ErrorFeedback.showErrorToast(err);  // Use separate error routine
    }

    /**
     * Method scrolls browser to timeline 
     */
    private scrollToDivider() {
        $('html, body').animate({
            scrollTop: $("div[name='divider']").offset().top - 20    // We want to read the divider title
        }, 'slow');
    }
}