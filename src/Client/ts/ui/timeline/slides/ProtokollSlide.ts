import Mustache from 'mustache';
import { Protokoll, Datei } from "../../../../../shared/dokumente";
import { TimelineSlide, SlideGenerator, TimelineSlideDefault } from "..";

export class ProtokollSlide implements SlideGenerator {

    /** Vorlage für den Textblock in der Slide */
    private TEXT_TEMPLATE = `<a class="app__pdfmodal__anchor" href="{{data.protokoll.url}}" 
                                    target="_blank"
                                    data-uuid="{{slide.unique_id}}">
                                    {{data.nnr}} <i class="fas fa-external-link-alt"></i>
                                </a>
                                <br /><strong>{{data.betreff}}</strong>
                                <br />{{data.ausschuss}}`;

    /** Referenz zu verknüpftem Datenobjekt */
    private data: Protokoll;

    /**
     * Statische Factory Methode für diese Klasse
     * @param data 
     */
    static build(data: Protokoll) {

        // Überprüfe, ob übergebene Daten ausreichen
        if(data.class !== 'Protokoll') { return null; }

        return new ProtokollSlide(data);
    }

    /**
     * Konstruktor
     * @param data 
     */
    private constructor(data: Protokoll) {
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
            url: "/static/img/protokoll-200x.png",
            link: this.data.protokoll.url,
            link_target: "_blank",
            thumbnail: "/static/img/protokoll-thumb.svg"
        },

        slide.text = {
            headline : this.data.class,
            text: Mustache.render(this.TEXT_TEMPLATE, {data: this.data, slide: slideDefaults})
        }
        
        return slide;
    }

    /**
     * Methode gibt Url des verlinkten PDFs zurück
     */
    getAssignedPdf(): Datei {
        return this.data.protokoll;
    } 
}