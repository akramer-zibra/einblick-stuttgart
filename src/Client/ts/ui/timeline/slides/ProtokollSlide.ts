import { Protokoll, Datei } from "../../../../../shared/dokumente";
import { TimelineSlide } from "..";

export class ProtokollSlide {

    /** Referenz zu verknüpftem Datenobjekt */
    private data: Protokoll;

    /**
     * Konstruktor
     * @param data 
     */
    constructor(data: Protokoll) {
        this.data = data;
    }
    
    /**
     * Methode ergänzt das übergebene Timeline Side-Objekt um spezifische Werte und Aussehen
     */
    adjustJson(slideDefaults: TimelineSlide) {
        
        slideDefaults.media = {
            url: "/static/img/protokoll-200x.png",
            link: this.data.protokoll.url,
            link_target: "_blank"
        },
        slideDefaults.text.text = `<a class="app__pdfmodal__anchor" href="${this.data.protokoll.url}" 
                                        target="_blank"
                                        data-uuid="${slideDefaults.unique_id}">
                                        ${this.data.nnr} <i class="fas fa-external-link-alt"></i>
                                    </a>
                                    <br /><strong>${this.data.betreff}</strong>
                                    <br />${this.data.ausschuss}`;
        
        return slideDefaults;
    }

    /**
     * Methode gibt Url des verlinkten PDFs zurück
     */
    getAssignedPdf(): Datei {
        return this.data.protokoll;
    } 
}