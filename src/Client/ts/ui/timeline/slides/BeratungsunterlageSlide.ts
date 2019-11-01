import Mustache from 'mustache';
import { Beratungsunterlage, Datei } from "../../../../../shared/dokumente";
import { TimelineSlide } from "..";

export class BeratungsunterlageSlide {

    /** Vorlage für den Textblock in der Slide */
    private TEXT_TEMPLATE = `<a class="app__pdfmodal__anchor" href="{{data.vorlage.url}}" 
                                target="_blank"
                                data-uuid="{{slide.unique_id}}">
                                {{data.id}} <i class="fas fa-external-link-alt"></i>
                            </a>
                            <br /><strong>{{data.titel}}</strong>
                            <br />{{data.ausschuss}}`;

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
    slideJson(slideDefaults: TimelineSlide) {
        
        slideDefaults.media = {
            url: "/static/img/beratungsunterlage-200x.png",
            link: this.data.vorlage.url,
            link_target: "_blank"
        },
        slideDefaults.text.text = Mustache.render(this.TEXT_TEMPLATE, {data: this.data, slide: slideDefaults});   // Wir rendern den Textblock mit Mustache
        
        return slideDefaults;
    }

    /**
     * Methode gibt Url des verlinkten PDFs zurück
     */
    getAssignedPdf(): Datei {
        return this.data.vorlage;
    } 
}