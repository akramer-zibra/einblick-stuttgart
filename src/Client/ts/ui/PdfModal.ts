import $ from "jquery";
import PDFObject from 'pdfobject';
import { Datei } from "../../../Server/Ratsdokumente/dokumente";
import { Timeline } from "./timeline/Timeline";

export class PdfModal {

    /**
     * Konstruktor
     */
    constructor(timeline: Timeline) {

        // Definiert event listener
        $('#app__pdfmodal .modal-close').on('click', this.hide.bind(this));
        $('#app__pdfmodal .modal-background').on('click', this.hide.bind(this));

        // Registiert event listener bei der Timeline Komponente
        timeline.addEventListener('change', () => console.log('PDFModal received change event'));
        timeline.addEventListener('change', this.attachPdfModalView.bind(this));
        timeline.addEventListener('loaded', this.attachPdfModalView.bind(this));
    }

    /**
     * Methode verknüpft einen event handler auf das übergebene HTML Element 
     * um bei Klick das Modal mit dem PDF anzuzeigen
     */
    attachPdfModalView() {

        // Überprüfe zuerst, ob inline PDFs vom browser überhaupt supported werden
        if(!PDFObject.supportsPDFs) {
            return;
        }

        // TODO Lade Dateiinformationen aus DOM

        // Lege einen Click Eventhanlder auf alle Elemente, die das pdfmodal anzeigen können
        $('.app__pdfmodal__anchor').on('click', (event) => {

            this.show({
                class: 'Datei',
                url: 'https://www.domino1.stuttgart.de/web/ksd/ksdRedSystem.nsf/0/3FC06629CE4EA240C125849A00318EA0/$File/ABA684D1EA697092C1258495004CF5FB.pdf?OpenElement',
                titel: 'Protokoll ...',
                mime: 'application/pdf'
            });
            event.preventDefault();
        });
    }

    /**
     * Methode blendet das übergebene PDF DOkument in einem Modal über der Seite ein
     * @param pdf 
     */
    show(file: Datei) { // ACHTUNG Declaration kommt aus der Serverseite 

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