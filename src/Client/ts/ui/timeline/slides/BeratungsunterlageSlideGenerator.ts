import moment from 'moment';
import Mustache from 'mustache';
import { SlideGenerator, TimelineSlide, TimelineSlideDefault } from "..";
import { Beratungsunterlage, Datei } from "../../../../../shared/ratsdokumente";

export class BeratungsunterlageSlideGenerator implements SlideGenerator {

    /** Vorlage für den Textblock in der Slide */
    private TEXT_TEMPLATE = `<a class="app__pdfmodal__anchor" href="{{data.dokument.url}}" 
                                target="_blank"
                                data-uuid="{{slide.unique_id}}">
                                {{data.bezeichnung}} <i class="fas fa-external-link-alt"></i>
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
    static build(data: Beratungsunterlage): BeratungsunterlageSlideGenerator|null {
        
        // Überprüfe, ob übergebene Daten ausreichen
        if(data.type !== 'Beratungsunterlage') { return null; }

        return new BeratungsunterlageSlideGenerator(data);
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
        const documentDate = moment(this.data.datum);

        slide.start_date = {
            year: documentDate.year(), 
            month: documentDate.month()+1,  // ACHTUNG: moment.js indexiert Monate mit 0 beginnend 
            day: documentDate.date()
        },

        slide.media = {
            url: "/static/img/beratungsunterlage-200px.png",
            link: this.data.dokument.url,
            link_target: "_blank",
            thumbnail: "/static/img/beratungsunterlage-thumb.svg",
            alt: slide.unique_id     // Wir platzieren die uuid dieser Slide in das alt-Attribut für eine Verlinkung
        },

        slide.text = {
            headline : this.data.type,
            text: Mustache.render(this.TEXT_TEMPLATE, {data: this.data, slide})  // Wir rendern den Textblock mit Mustache
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