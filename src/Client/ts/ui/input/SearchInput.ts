import $ from "jquery";
import { SearchController } from "../../controller/SearchController";
import { Divider } from "../Divider";
import { ToastFeedback } from "../ToastFeedback";

export class SearchInput {

    /** Referenzen zu anderen Objekten */
    private searchController: SearchController;

    /**
     * Factory Methode 
     * @param container 
     */
    static build(container) {
        return new SearchInput(container.SearchController);
    }

    /**
     * Konstruktor
     * @param SearchController
     */
    constructor(searchController: SearchController) {

        // Abhängigkeiten injizieren
        this.searchController = searchController;

        // Definiere Event-Listener der bei Klick auf "Suchen" Button reagiert
        $('#act__search').on('click', this.submit.bind(this));

        // ...und bei Enter Eingabe im Textfeld
        $('#app__search__text').on('keypress', (event) => {
            if(event.which === 13){
                this.submit(event);
            }
        });
    }

    /**
     * Methode steuert die Suchanfrage aus
     * @param event 
     */
    private submit(event) {

        // Ermittle den Suchtext 
        const searchtext = $('#app__search__text').val();

        $('.pageloader').addClass('is-active');

        // Benutze den Search-Controller für die Datenabfrage und Weitergabe
        this.searchController
            .search(searchtext)
            .then((count) => {
                $('.pageloader').removeClass('is-active');
                if(count > 0) { Divider.scrollTo(); }   // Wir scrollen bis zu den Suchergebnissen, wenn es welche gibt                 
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