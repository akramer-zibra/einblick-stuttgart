import $ from 'jquery';
import { SearchHistory } from "../helper/SearchHistory";
import { RatsdokumenteProvider } from "../provider/Ratsdokumente.provider";
import { Divider } from "../ui/Divider";
import { TypeInput } from "../ui/input/TypeInput";
import { Timeline } from "../ui/timeline/Timeline";
import { ToastFeedback } from "../ui/ToastFeedback";

export class SearchController {

    /** Referenzen zu notwendigen Objekten */

    /**
     * Statische factory Methode
     * @param container 
     */
    static build(container) {
        return new SearchController(container.RatsdokumenteProvider, 
                                    container.Timeline, 
                                    container.SearchHistory,
                                    container.TypeInput);
    }

    /**
     * Konstruktor
     * @param ratsdokumenteProvider 
     * @param timeline 
     */
    constructor(private ratsdokumenteProvider: RatsdokumenteProvider, 
                private timeline: Timeline, 
                private searchHistory: SearchHistory,
                private typeInput: TypeInput) {
    }

    /**
     * Methode führt die Suche mit dem übergebenen Text aus
     * @param searchtext 
     */
    search(searchtext: string): Promise<number> {

        // Wir blenden den Pageloader ein
        $('.pageloader').addClass('is-active');

        // Behalte den Suchtext in einer Historie
        this.searchHistory.remember(searchtext);

        // Ermittle ausgewählte Dokumenttypen
        const dokumenttypen: string[] = this.typeInput.values();

        return new Promise((resolve, reject) => {

            // Benutze den Ratsdokumente-Provider um an die Daten aus der GraphQL API zu kommen
            this.ratsdokumenteProvider
                .queryRatsdokumenteByText(searchtext, dokumenttypen)
                .then((apiData) => {

                    // Wir blenden den pageloader aus, sobald ein Ergebnis da ist
                    $('.pageloader').removeClass('is-active');

                    // Überprüfe, ob überhaupt Ergebnisse vorhanden sind
                    if(apiData.ratsdokumente.length === 0) {
                        this.handleEmptyResult();
                        return resolve(0);        // Wir stoppen an dieser Stelle
                    } 
                    // ansonsten...

                    // Zeige eine aktualisierte Timeline
                    this.timeline.updateWithApiData(apiData.ratsdokumente);     // Übergebe die API Daten an die Timeline Instanz, um zu aktualisieren

                    // Wir zeigen im Divider den Suchtext
                    // ...und scrollen dorthin
                    Divider.setTitle(`Suche: ${searchtext} (${apiData.ratsdokumente.length} Ergebnisse)`);
                    Divider.scrollTo(); 
                    
                    resolve(apiData.ratsdokumente.length);
                })
                .catch(err => {
                    // wir blenden den Pageloader wieder aus, bevor wir den Fehler weitergeben
                    $('.pageloader').removeClass('is-active');
                    this.handleError(err);
                    reject(err);
                });
        });
    }
    
    /**
     * Methode reagiert auf ein leeres Ergebnis
     */
    private handleEmptyResult() {
        ToastFeedback.showWarningToast("Es wurden keine Dokumente gefunden. Überprüfe doch nochmal, ob auch alle Dokumenttypen angegeben sind, die du durchsuchen möchtest.");    // Wir zeigen eine Toast Warnung
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