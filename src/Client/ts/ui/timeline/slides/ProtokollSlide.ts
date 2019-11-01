import { Protokoll } from "../../../../../shared/dokumente";

export class ProtokollSlide {

    /**  */
    private data: Protokoll

    /**
     * Konstruktor
     * @param data 
     */
    constructor(data: Protokoll) {
        this.data = data;
    }
    
    /**
     * Methode ergänzt das übergebene Timeline Side-Objekt um spezifische Werte und Aussehen
     */
    adjustJson(slideDefaults) {
        
        slideDefaults.media = {
            url: "/static/img/protokoll-200x.png",
            link: this.data.protokoll.url,
            link_target: "_blank"
        },
        slideDefaults.text.text = `<a class="app__pdfmodal__anchor" href="${this.data.protokoll.url}" target="_blank">${this.data.nnr} <i class="fas fa-external-link-alt"></i></a>
                            <br /><strong>${this.data.betreff}</strong>
                            <br />${this.data.ausschuss}`;
        
        return slideDefaults;
    }
}