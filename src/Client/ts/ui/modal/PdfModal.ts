import $ from "jquery";
import PDFObject from 'pdfobject';
import { Datei } from "../../../../shared/dokumente";
import { Timeline } from "../timeline/Timeline";
import { TimelineEvent, SlideGenerator } from "../timeline";
import { BeratungsunterlageSlide } from "../timeline/slides/BeratungsunterlageSlide";
import { ProtokollSlide } from "../timeline/slides/ProtokollSlide";
import { AntragSlide } from "../timeline/slides/AntragSlide";

export class PdfModal {

    /** Referenz zu Timeline Instanz */
    private timeline: Timeline;

    /**
     * Konstruktor
     * @param timeline
     */
    constructor(timeline: Timeline) {

        // Abhängigkeiten injizieren
        this.timeline = timeline;

        // Definiert event listener
        $('#app__pdfmodal .modal-close').on('click', this.hide.bind(this));
        $('#app__pdfmodal .modal-background').on('click', this.hide.bind(this));

        // Registiert event listener bei der Timeline Komponente
        timeline.addEventListener('loaded', this.attachPdfModalView.bind(this));
    }

    /**
     * Methode verknüpft einen event handler auf das übergebene HTML Element 
     * um bei Klick das Modal mit dem PDF anzuzeigen
     */
    attachPdfModalView(slideEvent: TimelineEvent) {

        // Überprüfe zuerst, ob inline PDFs vom browser überhaupt supported werden
        if(!PDFObject.supportsPDFs) { return; }

        // Lege einen Click Eventhanlder auf alle Elemente, die das pdfmodal anzeigen können
        $('.app__pdfmodal__anchor').on('click', this.clickLinkEventHandler.bind(this));
        $('.tl-media-content-container .tl-media-link').on('click', this.clickMediaEventHandler.bind(this));
    }

    /**
     * Methode blendet das übergebene PDF Dokument in einem Modal über der Seite ein
     * @param pdfFile 
     */
    show(pdfFile: Datei) {

        // Integriere fremdes PDF in das Modal mit dem PDFjs Viewer
        PDFObject.embed(pdfFile.url, '#app__pdfmodal__viewer', {
            pdfOpenParams: { view: 'FitH,20' }      // Passt sich an die verfügbare Breite mit ein bisschen Padding an
        });

        $('#app__pdfmodal').addClass('is-active');
    }

    /**
     * Methode lässt das Modal wieder verschwinden
     */
    hide() {
        $('#app__pdfmodal').removeClass('is-active');
    } 

    /**
     * Methode reagiert auf das Click Event eines Links aus den Slides, 
     * welche das PdfModal anzeigen sollen
     * @param event 
     */
    private clickLinkEventHandler(event) {
        
        // Unterdrücke die eigentliche Funktion des Links
        event.preventDefault();

        // Lade Slide uuid aus data Attribut des Links
        const uuid = $(event.target).attr('data-uuid');

        // Zeige verknüpfte Datei im PdfModal 
        this.showAssignedPdfFromUuid(uuid);        
    }

    /**
     * Methode reagiert auf ein Click Event auf das Media-Bild eines Slides
     * @param event 
     */
    private clickMediaEventHandler(event) {

        // Unterdrücke eigentliche Funktion des HTML Elements
        event.preventDefault();

        // Lade uuid von alt
        const uuid = $(event.target).attr('alt');

        // Zeige verknüpfte Datei im PdfModal 
        this.showAssignedPdfFromUuid(uuid);      
    }

    /**
     * Methode versucht ein PdfMOdal anhand der übergebenen Slide uuid einzublenden
     * @param uuid 
     */
    private showAssignedPdfFromUuid(uuid: string) {

        // Lade gecachtes Datenobjekt das zu dieser Slide gehört
        const slideObj = this.timeline.slideInstance(uuid) as SlideGenerator;

        // ...wir stoppen hier, wenn wir zu der uuid kein passendes Slide Objekt bekommen
        if(slideObj === null) { return; }

        // Zeige die verknüpfte Datei
        this.show(slideObj.getAssignedPdf());
    }
}