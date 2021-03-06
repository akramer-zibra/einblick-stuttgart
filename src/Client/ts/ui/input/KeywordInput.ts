import $ from "jquery";
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

        // Benutze den Search-Controller für die Datenabfrage und Weitergabe
        this.searchController.search(keyword);
    }
}