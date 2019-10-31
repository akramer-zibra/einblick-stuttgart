import $ from "jquery";
import { Timeline } from "./Timeline";
import { ErrorFeedback } from "./ErrorFeedback";
import { RatsdokumenteProvider } from "../provider/Ratsdokumente.provider";

export class KeywordInput {

    /** Dependencies references */
    private ratsdokumenteProvider: RatsdokumenteProvider;
    private timeline: Timeline;

    /**
     * Constructor method
     * @param ratsdokumenteProvider
     * @param timeline 
     */
    constructor(ratsdokumenteProvider: RatsdokumenteProvider, timeline: Timeline) {

        // Dependency injection
        this.ratsdokumenteProvider = ratsdokumenteProvider;
        this.timeline = timeline;

        // Define event listener for click events
        $('.act__keyword').on('click', (event) => {

            // Get keyword from tag text
            const keyword = $(event.target).text();

            $('.pageloader').addClass('is-active');

            // Use Ratsdokumente provider to query our data
            this.ratsdokumenteProvider
                .queryRatsdokumenteByKeyword(keyword)
                .then((apiData) => {

                    $('.pageloader').removeClass('is-active');
                    this.scrollToDivider();

                    // Give received api data to timeline for an update
                    this.timeline.updateWithApiData(apiData.ratsdokumente);
                })
                .catch(err => {
                    $('.pageloader').removeClass('is-active');
                    this.handleError(err) 
                });
        });
    }

    /**
     * Method handles error 
     * @param err 
     */
    private handleError(err) {
        console.error(err);
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