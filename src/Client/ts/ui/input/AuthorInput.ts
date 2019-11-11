
import $ from 'jquery';
import { SearchController } from '../../controller/SearchController';
import { ToastFeedback } from '../ToastFeedback';
import { TypeInput } from './TypeInput';

export class AuthorInput {

    /**
     * Factory Methode
     * @param container 
     */
    static build(container) {
        return new AuthorInput(container.SearchController,
                               container.TypeInput)
    }

    /**
     * Konstruktor
     * @param searchController
     */
    private constructor(private searchController: SearchController,
                        private typeInput: TypeInput) {

        // Definiere Event-Listener die auf Klicks auf die Tags reagieren
        $('.act__author').on('click', this.submit.bind(this));
    }
    
    /**
     * Methode löst die Suchanfrage aus
     * @param event 
     */
    private submit(event) {

        // Ermittle den ausgewählten Author (Fraktion) 
        const fraktion = $(event.target).closest('.act__author').attr('data-author');

        // Setze die gewünschten Dokumenttypen auf "Anträge"
        this.typeInput.activate(['Antrag'])

        $('.pageloader').addClass('is-active');

        // Benutze den Search-Controller für die Datenabfrage und Weitergabe
        this.searchController
            .search(fraktion)
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