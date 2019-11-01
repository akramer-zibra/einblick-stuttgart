import { Beratungsunterlage, Datei } from "../../../../../shared/dokumente";
import { TimelineSlide } from "..";

export class BeratungsunterlageSlide {

    /** Referenz zu verknüpftem Datenobjekt */
    private data: Beratungsunterlage;

    /**
     * Konstruktor
     * @param data 
     */
    constructor(data: Beratungsunterlage) {
        this.data = data;
    }

    /**
     * Methode ergänzt das übergebene Timeline Side-Objekt um spezifische Werte und Aussehen
     */
    adjustJson(slideDefaults: TimelineSlide) {
        
        slideDefaults.media = {
            url: "/static/img/beratungsunterlage-200x.png",
            link: this.data.vorlage.url,
            link_target: "_blank"
        },
        slideDefaults.text.text = `<a class="app__pdfmodal__anchor" href="${this.data.vorlage.url}" 
                                      target="_blank"
                                      data-uuid="${slideDefaults.unique_id}">
                                        ${this.data.id} <i class="fas fa-external-link-alt"></i>
                                    </a>
                                    <br /><strong>${this.data.titel}</strong>
                                    <br />${this.data.ausschuss}`;
        
        return slideDefaults;
    }

    /**
     * Methode gibt Url des verlinkten PDFs zurück
     */
    getAssignedPdf(): Datei {
        return this.data.vorlage;
    } 
}