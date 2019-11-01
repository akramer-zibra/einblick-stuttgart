import Mustache from 'mustache';
import { Datei, Antrag } from "../../../../../shared/dokumente";
import { TimelineSlide, SlideGenerator, TimelineSlideDefault } from "..";

export class AntragSlide implements SlideGenerator {

    /** Vorlage für den Textblock in der Slide */
    private TEXT_TEMPLATE = `<a class="app__pdfmodal__anchor" href="{{data.dokument.url}}" 
                                    target="_blank"
                                    data-uuid="{{slide.unique_id}}">
                                    {{data.bezeichnung}} <i class="fas fa-external-link-alt"></i>
                                </a>
                                <br /><strong>{{data.betreff}}</strong>
                                <br />{{data.fraktionen}}`;

    /** Referenz zu verknüpftem Datenobjekt */
    private data: Antrag;

    /**
     * Statische Factory Methode für diese Klasse
     * @param data 
     */
    static build(data: Antrag) {

        // Überprüfe, ob übergebene Daten ausreichen
        if(data.class !== 'Antrag') { return null; }

        return new AntragSlide(data);
    }

    /**
     * Konstruktor
     * @param data 
     */
    private constructor(data: Antrag) {
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
            url: "/static/img/antrag-200px.png",
            link: this.data.dokument.url,
            link_target: "_blank",
            thumbnail: "/static/img/antrag-thumb.svg",
            alt: slide.unique_id     // Wir platzieren die uuid dieser Slide in das alt-Attribut für eine Verlinkung
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
        return this.data.dokument;
    } 
}