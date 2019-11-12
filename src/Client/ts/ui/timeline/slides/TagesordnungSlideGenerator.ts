import moment from 'moment';
import Mustache from 'mustache';
import { SlideGenerator, TimelineSlide, TimelineSlideDefault } from "..";
import { Datei, Tagesordnung } from "../../../../../shared/ratsdokumente";

export class TagesordnungSlideGenerator implements SlideGenerator {

    /** Vorlage für den Textblock in der Slide */
    private TEXT_TEMPLATE = `<a class="app__pdfmodal__anchor" href="{{data.dokument.url}}" 
                                    target="_blank"
                                    data-uuid="{{slide.unique_id}}">
                                    Tagesordnung <i class="fas fa-external-link-alt"></i>
                                </a>
                                <br /><strong>{{data.ausschuss}}</strong>`;

    /** Referenz zu verknüpftem Datenobjekt */
    private data: Tagesordnung;

    /**
     * Statische Factory Methode für diese Klasse
     * @param data 
     */
    static build(data: Tagesordnung) {

        // Überprüfe, ob übergebene Daten ausreichen
        if(data.type !== 'Tagesordnung') { return null; }

        return new TagesordnungSlideGenerator(data);
    }

    /**
     * Konstruktor
     * @param data 
     */
    private constructor(data: Tagesordnung) {
        this.data = data;
    }
    
    /**
     * Methode ergänzt das übergebene Timeline Side-Objekt um spezifische Werte und Aussehen
     */
    generateWith(slideDefaults: TimelineSlideDefault): TimelineSlide {
        
        // Wir übernehmen die Defaults aus dem Argument und überschreiben die spezifischen Sachen
        const slide = (slideDefaults as TimelineSlide);

        // Deserialisiere "Datum" String in ein Date Objekt
        const documentDate = moment(this.data.datum);

        slide.start_date = {
            year: documentDate.year(), 
            month: documentDate.month()+1,  // ACHTUNG: moment.js indexiert Monate mit 0 beginnend 
            day: documentDate.date(),
            hour: documentDate.hour(),
            minute: documentDate.minute()
        },

        slide.media = {
            url: "/static/img/tagesordnung-200px.png",
            link: this.data.dokument.url,
            link_target: "_blank",
            thumbnail: "/static/img/tagesordnung-thumb.svg",
            alt: slide.unique_id     // Wir platzieren die uuid dieser Slide in das alt-Attribut für eine Verlinkung
        },

        slide.text = {
            headline : this.data.type,
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