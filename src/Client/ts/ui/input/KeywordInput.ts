import $ from "jquery";
import { ToastFeedback } from "../ToastFeedback";
import { SearchController } from "../../controller/SearchController";
import { Divider } from "../Divider";

export class KeywordInput {

    /** Referenzen zu anderen Objekten */
    private searchController: SearchController;

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
            .then((count) => {
                $('.pageloader').removeClass('is-active');
                
                /*
                // Wenn kein Ergebnis da ist, dann resetten wir den Divider und leeren die timeline 
                if(count === 0) {
                    Divider.reset();
                    $('#timeline-embed').empty().removeClass('tl-timeline');
                    return;
                } 

                // ...anonsten scrollen wir ganz normal zum Suchergebnis
                Divider.scrollTo(); 
                */
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