import $ from "jquery";
import { Timeline } from "./Timeline";
import { ToastFeedback } from "./ToastFeedback";
import { RatsdokumenteProvider } from "../provider/Ratsdokumente.provider";

export class KeywordInput {

    /** Referenzen zu anderen Objekten */
    private ratsdokumenteProvider: RatsdokumenteProvider;
    private timeline: Timeline;

    /**
     * Konstruktor
     * @param ratsdokumenteProvider
     * @param timeline 
     */
    constructor(ratsdokumenteProvider: RatsdokumenteProvider, timeline: Timeline) {

        // Abhängigkeiten injizieren
        this.ratsdokumenteProvider = ratsdokumenteProvider;
        this.timeline = timeline;

        // Definiere Event-Listener die auf Klicks auf die Tags reagieren
        $('.act__keyword').on('click', this.submit.bind(this));
    }

    /**
     * Methode steuert die Suchanfrage aus
     * @param event 
     */
    private submit(event) {

        // Ermittle den Suchtext 
        const searchtext = $('#app__searchtext').val();

        $('.pageloader').addClass('is-active');

        // Benutze den Ratsdokumente-Provider um an die Daten aus der GraphQL API zu kommen
        this.ratsdokumenteProvider
            .queryRatsdokumenteByText(searchtext)
            .then((apiData) => {

                $('.pageloader').removeClass('is-active');

                // Überprüfe, ob überhaupt Ergebnisse vorhanden sind
                if(apiData.ratsdokumente.length === 0) {
                    this.handleEmptyResult();
                    return;
                }

                this.scrollToDivider();
                this.timeline.updateWithApiData(apiData.ratsdokumente);     // Übergebe die API Daten an die Timeline Instanz, um zu aktualisieren
            })
            .catch(err => {
                $('.pageloader').removeClass('is-active');
                this.handleError(err) 
            });
    }

    /**
     * Methode reagiert auf Fehler
     * @param err 
     */
    private handleError(err) {
        console.error(err);
        ToastFeedback.showErrorToast(err);  // Benutze eine separate Funktion für eine grafische Rückmeldung
    }

    /**
     * Methode reagiert auf ein leeres Ergebnis
     */
    private handleEmptyResult() {
        ToastFeedback.showWarningToast("Es wurden keine Dokumente gefunden...");
    }

    /**
     * Methode scrollt den Browser bis zur Timeline
     */
    private scrollToDivider() {
        $('html, body').animate({
            scrollTop: $("div[name='divider']").offset().top - 20    // We want to read the divider title
        }, 'slow');
    }
}