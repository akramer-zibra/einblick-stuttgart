import Mustache from 'mustache';
import { Beratungsunterlage, Datei } from "../../../../../shared/dokumente";
import { TimelineSlide, SlideGenerator, TimelineSlideDefault } from "..";

export class BeratungsunterlageSlide implements SlideGenerator {

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
     * Statische Factory Methode für diese Klasse
     * Die Methode überprüft die übergebene Datenstruktur und gibt null zurück, falls 
     * keine Instanz davon gebaut werden kann 
     * @param data 
     */
    static build(data: Beratungsunterlage): BeratungsunterlageSlide|null {
        
        // Überprüfe, ob übergebene Daten ausreichen
        if(data.class !== 'Beratungsunterlage') { return null; }

        return new BeratungsunterlageSlide(data);
    }

    /**
     * Konstruktor
     * @param data 
     */
    private constructor(data: Beratungsunterlage) {
        this.data = data;
    }

    /**
     * Methode ergänzt das übergebene Timeline Side-Objekt um spezifische Werte und Aussehen
     */
    generateWith(slideDefaults: TimelineSlideDefault): TimelineSlide {
        
        // Wir übernehmen die Defaults aus dem Argument und überschreiben die spezifischen Sachen
        const slide = (slideDefaults as TimelineSlide);

        // Deserialisiere "Datum" String in ein Date Objekt
        const documentDate = new Date(this.data.datum);

        slide.start_date = {
            year: documentDate.getFullYear(), 
            month: documentDate.getMonth(),
            day: documentDate.getDay()
        },

        slide.media = {
            url: "/static/img/beratungsunterlage-200x.png",
            link: this.data.vorlage.url,
            link_target: "_blank"
        },

        slide.text = {
            headline : this.data.class,
            text: Mustache.render(this.TEXT_TEMPLATE, {data: this.data, slide: slideDefaults})  // Wir rendern den Textblock mit Mustache
        }
                
        return slide;
    }

    /**
     * Methode gibt Url des verlinkten PDFs zurück
     */
    getAssignedPdf(): Datei {
        return this.data.vorlage;
    } 
}