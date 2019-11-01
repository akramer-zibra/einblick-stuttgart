import $ from "jquery";
import { ToastFeedback } from "../ToastFeedback";
import { SearchController } from "../../controller/SearchController";

export class KeywordInput {

    /** Referenzen zu anderen Objekten */
    private searchController: SearchController;

    /**
     * Statische factory Methode
     * @param container 
     */
    static build(container) {
        return new KeywordInput(container.SearchController);
    }

    /**
     * Konstruktor
     * @param searchController
     */
    constructor(searchController: SearchController) {

        // Abhängigkeiten injizieren
        this.searchController = searchController

        // Definiere Event-Listener die auf Klicks auf die Tags reagieren
        $('.act__keyword').on('click', this.submit.bind(this));
    }

    /**
     * Methode steuert die Suchanfrage aus
     * @param event 
     */
    private submit(event) {

        // Ermittle das ausgewählte Stichwort 
        const keyword = $(event.target).text();

        $('.pageloader').addClass('is-active');

        // Benutze den Search-Controller für die Datenabfrage und Weitergabe
        this.searchController
            .search(keyword)
            .then(() => {
                $('.pageloader').removeClass('is-active');
            })
            .catch((error) => {
                $('.pageloader').removeClass('is-active');
                this.handleError(error);
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
}