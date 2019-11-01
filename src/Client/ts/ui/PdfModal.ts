import $ from "jquery";
import PDFObject from 'pdfobject';
import { Datei } from "../../../shared/dokumente";
import { Timeline } from "./timeline/Timeline";
import { TimelineEvent } from "./timeline";
import { BeratungsunterlageSlide } from "./timeline/slides/BeratungsunterlageSlide";
import { ProtokollSlide } from "./timeline/slides/ProtokollSlide";

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
        timeline.addEventListener('change', this.attachPdfModalView.bind(this));
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
        $('.app__pdfmodal__anchor').on('click', (event) => {

            // Lade slide uuid aus pdfmodal ancher
            const uuid = $(event.target).attr('data-uuid');

            // Lade gecachtes Datenobjekt das zu dieser Slide gehört
            const slideObj = this.timeline.slideInstance(uuid) as BeratungsunterlageSlide|ProtokollSlide;

            // ...wir stoppen hier, wenn wir zu der uuid kein passendes Slide Objekt bekommen
            if(slideObj === null) { return; }

            // Zeige PdfModal mit der PDF DAtei, welche mit dieser Slide verknüpft ist
            this.show(slideObj.getAssignedPdf());

            event.preventDefault();
        });
    }

    /**
     * Methode blendet das übergebene PDF DOkument in einem Modal über der Seite ein
     * @param pdf 
     */
    show(file: Datei) {

        // Integriere fremdes PDF in das Modal mit einem Viewer ein
        PDFObject.embed(file.url, '#app__pdfmodal__viewer', {
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
}