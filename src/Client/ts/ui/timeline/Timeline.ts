declare const TL: any;  // Declares global TL object integrated with linked script file in index.html
import { TimelineData, TimelineSlide } from "./timeline.d";
import { Protokoll, Beratungsunterlage } from "../../../../Server/Ratsdokumente/dokumente";

export class Timeline {

    /** Referenz zu intermer Timeline Instanz */
    private timeline: any;

    /** Hashmap mit Arrays von listenern für bestimmte Events der Timeline */
    private listeners: any = {};

    /**
     * Konstruktor
     */
    constructor() {
        console.log('Timeline initialisiert...');
    }
    
    /**
     * Methode aktualisiert die Timeline mit neuen Daten
     * @param timelineJson 
     */
    update(timelineJson: TimelineData) {

        // Erzeuge eine neue Timeline mit den übergebenen Daten
        this.timeline = new TL.Timeline('timeline-embed', timelineJson, {
                start_at_end: true,
                timenav_height: 300,
                language: 'de',
                track_events: ['loaded', 'added', 'change', 'nav_next', 'nav_previous']
            });

        // Die registrierten event Listener mit der frischen Timeline verbinden
        Object.keys(this.listeners).forEach((event) => {
            this.listeners[event].forEach((listener) => {
                this.timeline.on(event, listener, this);
            });
        })

        // Trigger timeline loaded event
        this.timeline.fire('loaded', {}, this.timeline);
    }

    /**
     * Methode bindet listeners update übergreifend an die Timeline
     * @param event 
     * @param listener 
     */
    addEventListener(event: string, listener) {
        if(!(event in this.listeners)) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    /**
     * Methode aktualisiert die Timeline mit api Daten
     * @param apiRatsdokumente 
     */
    updateWithApiData(apiRatsdokumente: any) {
        const timelineData = this.transform(apiRatsdokumente);
        this.update(timelineData);
    }

    /**
     * Methode transformiert die übergebenen API Daten in die 
     * Timeline Datenstruktur um
     * @param apiRatsdokumente 
     */
    private transform(apiRatsdokumente: any): TimelineData {

        const slides: TimelineSlide[] = [];

        // Wir wandeln jedes Ratsdokument in eine Timeline Slide um
        apiRatsdokumente.forEach((ratsdokument) => {

            // Deserialisiere "Datum" String in ein Date Objekt
            const ratsdokumentDatum = new Date(ratsdokument.datum);

            // Starte mit den default Werten dieser Slide
            let slide: TimelineSlide = {
                start_date: {
                    year: ratsdokumentDatum.getFullYear(), 
                    month: ratsdokumentDatum.getMonth(),
                    day: ratsdokumentDatum.getDay()
                },
                text: {
                    headline: ratsdokument.class
                }
            };

            // Befülle diese Slide entsprechend des Dokumenttyps            
            slide = this.classDependingLook(slide, ratsdokument);

            // Übernehme diese Slide in die Timeline Datenstruktur
            slides.push(slide);
        });

        return { events: slides };
    } 

    /**
     * Methode generiert eine Dokumenttyp spezifischen Look der übergebenen Slide
     * @param dokument 
     */
    private classDependingLook(slide: TimelineSlide, dokument): TimelineSlide {
        if(dokument.class === "Beratungsunterlage") {

            (dokument as Beratungsunterlage);   // ACHTUNG: Dieser Typ ist eine Serverseitige Definition

            slide.media = {
                url: "/static/img/beratungsunterlage-200x.png",
                link: dokument.vorlage.url,
                link_target: "_blank"
            },
            slide.text.text = `<a class="app__pdfmodal__anchor" href="${dokument.vorlage.url}" target="_blank">${dokument.id} <i class="fas fa-external-link-alt"></i></a>
                                <br /><strong>${dokument.titel}</strong>
                                <br />${dokument.ausschuss}`;

        } else if(dokument.class === "Protokoll") {

            (dokument as Protokoll);    // ACHTUNG: Dieser Typ ist eine Serverseitige Definition

            slide.media = {
                url: "/static/img/protokoll-200x.png",
                link: dokument.protokoll.url,
                link_target: "_blank"
            },
            slide.text.text = `<a class="app__pdfmodal__anchor" href="${dokument.protokoll.url}" target="_blank">${dokument.nnr} <i class="fas fa-external-link-alt"></i></a>
                                <br /><strong>${dokument.betreff}</strong>
                                <br />${dokument.ausschuss}`;
        } else {
            throw new Error("Es wurde ein Dokumententyp gefunden, der nicht unterstützt wird: "+ dokument.class);
        }
        return slide;
    }
}