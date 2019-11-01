import $ from "jquery";
import { Datei } from "../../../Server/Ratsdokumente/dokumente";

export class PdfModal {

    /**
     * Konstruktor
     */
    constructor() {

        // Definiert event listener
        $('#app__pdfmodal .modal-close').on('click', this.hide.bind(this));
        $('#app__pdfmodal .modal-background').on('click', this.hide.bind(this));

        this.show();
    }

    /**
     * Methode blendet das übergebene PDF DOkument in einem Modal über der Seite ein
     * @param pdf 
     */
    show() { // ACHTUNG Declaration kommt aus der Serverseite 

        const url = '/static/pdf/ABA684D1EA697092C1258495004CF5FB.pdf';

        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        const pdfjsLib = window['pdfjs-dist/build/pdf'];

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

        // Asynchronous download of PDF
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((pdf) => {

            console.log('PDF loaded');

            // Fetch the first page
            const pageNumber = 1;
            pdf.getPage(pageNumber).then((page) => {
                console.log('Page loaded');

                const scale = 0.5;
                const viewport = page.getViewport({ scale });

                // Prepare canvas using PDF page dimensions
                const canvas = $('#app__pdfmodal__canvas');
                const context = canvas[0].getContext('2d');

                canvas.height(viewport.height);
                canvas.width(viewport.width);

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: context,
                    viewport
                };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(() => {
                    console.log('Page rendered');
                });
            });
        }, (reason) => {
            // PDF loading error
            console.error(reason);
        });
    }

    /**
     * Methode lässt das Modal wieder verschwinden
     */
    hide() {
        $('#app__pdfmodal').removeClass('is-active');
    } 
}