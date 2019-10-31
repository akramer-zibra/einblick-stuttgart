import $ from "jquery";
import { Timeline } from "./Timeline";
import { ToastFeedback } from "./ToastFeedback";
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

                    // Check if result set is empty
                    if(apiData.ratsdokumente.length === 0) {
                        this.handleEmptyResult();
                        return;
                    }

                    this.scrollToDivider();
                    this.timeline.updateWithApiData(apiData.ratsdokumente); // Give received api data to timeline for an update
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
        ToastFeedback.showErrorToast(err);  // Use separate error routine
    }

    /**
     * Method gives feed
     */
    private handleEmptyResult() {
        ToastFeedback.showWarningToast("Es wurden keine Dokumente gefunden...");
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