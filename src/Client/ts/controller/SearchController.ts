import { RatsdokumenteProvider } from "../provider/Ratsdokumente.provider";
import { Timeline } from "../ui/Timeline";
import { ToastFeedback } from "../ui/ToastFeedback";
import { Divider } from "../ui/Divider";

export class SearchController {

    /** Referenzen zu notwendigen Objekten */
    private ratsdokumenteProvider;
    private timeline;

    /**
     * Konstruktor
     * @param ratsdokumenteProvider 
     * @param timeline 
     */
    constructor(ratsdokumenteProvider: RatsdokumenteProvider, timeline: Timeline) {

        // Abhängikeiten injizieren
        this.ratsdokumenteProvider = ratsdokumenteProvider;
        this.timeline = timeline;
    }

    /**
     * Methode führt die Suche mit dem übergebenen Text aus
     * @param searchtext 
     */
    search(searchtext: string): Promise<number> {

        return new Promise((resolve, reject) => {

            // Benutze den Ratsdokumente-Provider um an die Daten aus der GraphQL API zu kommen
            this.ratsdokumenteProvider
                .queryRatsdokumenteByText(searchtext)
                .then((apiData) => {

                    // Überprüfe, ob überhaupt Ergebnisse vorhanden sind
                    if(apiData.ratsdokumente.length === 0) {
                        this.handleEmptyResult();
                        resolve(0);
                    }

                    // Wir zeigen im Divider den Suchtext
                    Divider.setTitle('Suche: ' + searchtext);

                    this.timeline.updateWithApiData(apiData.ratsdokumente);     // Übergebe die API Daten an die Timeline Instanz, um zu aktualisieren
                    resolve(apiData.ratsdokumente.length);
                })
                .catch(reject);
        });

    }
    
    /**
     * Methode reagiert auf ein leeres Ergebnis
     */
    private handleEmptyResult() {
        ToastFeedback.showWarningToast("Es wurden keine Dokumente gefunden...");
    }
}