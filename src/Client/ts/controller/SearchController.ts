import { RatsdokumenteProvider } from "../provider/Ratsdokumente.provider";
import { Timeline } from "../ui/timeline/Timeline";
import { ToastFeedback } from "../ui/ToastFeedback";
import { Divider } from "../ui/Divider";
import { SearchHistory } from "../helper/SearchHistory";

export class SearchController {

    /** Referenzen zu notwendigen Objekten */
    private ratsdokumenteProvider;
    private timeline: Timeline;
    private searchHistory: SearchHistory;

    /**
     * Statische factory Methode
     * @param container 
     */
    static build(container) {
        return new SearchController(container.RatsdokumenteProvider, container.Timeline, container.SearchHistory);
    }

    /**
     * Konstruktor
     * @param ratsdokumenteProvider 
     * @param timeline 
     */
    constructor(ratsdokumenteProvider: RatsdokumenteProvider, 
                timeline: Timeline, 
                searchHistory: SearchHistory) {

        // Abhängikeiten injizieren
        this.searchHistory = searchHistory;
        this.ratsdokumenteProvider = ratsdokumenteProvider;
        this.timeline = timeline;
    }

    /**
     * Methode führt die Suche mit dem übergebenen Text aus
     * @param searchtext 
     */
    search(searchtext: string): Promise<number> {

        // Behalte den Suchtext in einer Historie
        this.searchHistory.remember(searchtext);

        return new Promise((resolve, reject) => {

            // Benutze den Ratsdokumente-Provider um an die Daten aus der GraphQL API zu kommen
            this.ratsdokumenteProvider
                .queryRatsdokumenteByText(searchtext)
                .then((apiData) => {

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
                    Divider.setTitle('Suche: ' + searchtext);
                    Divider.scrollTo(); 
                    
                    resolve(apiData.ratsdokumente.length);
                })
                .catch(reject);
        });
    }
    
    /**
     * Methode reagiert auf ein leeres Ergebnis
     */
    private handleEmptyResult() {
        ToastFeedback.showWarningToast("Es wurden keine Dokumente gefunden...");    // Wir zeigen eine Toast Warnung
    }
}