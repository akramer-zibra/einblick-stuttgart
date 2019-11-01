declare const TL: any;  // Declares global TL object integrated with linked script file in index.html
import { TimelineData, TimelineSlide } from ".";
import { Protokoll, Beratungsunterlage } from "../../../../shared/dokumente";
import { BeratungsunterlageSlide } from "./slides/BeratungsunterlageSlide";
import { ProtokollSlide } from "./slides/ProtokollSlide";
import uuidv4 from 'uuid/v4';

export class Timeline {

    /** Referenz zu intermer Timeline Instanz */
    private timeline: any;

    /** Hashmap mit Arrays von listenern für bestimmte Events der Timeline */
    private listeners: any = {};

    /** Hashmap cached Objekt mit einer uuid */
    private cacheObjects: any = {};

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
     * Methode cached übergebenes Datenobjekt
     * Das Datenobjekt ist über die eindeutige uuid wieder abrufbar
     * @param uuid 
     * @param data 
     */
    cache(uuid: string, data: any) {
        this.cacheObjects[uuid] = data;
    }

    /**
     * Methode gibt das mit einer Slide verknüpfte Datenobjekt
     * @param uuid 
     */
    slideInstance(uuid): any|null {
        if(uuid in this.cacheObjects) { return this.cacheObjects[uuid]; } 
        return null;
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

            // Wir generieren eine uuid für diese Slide
            // ...um die Datenstruktur, die zur Slide gehört, eindeutig zu cachen
            const uniqueId = uuidv4();

            // Starte mit den default Werten dieser Slide
            let slide: TimelineSlide = {
                start_date: {
                    year: ratsdokumentDatum.getFullYear(), 
                    month: ratsdokumentDatum.getMonth(),
                    day: ratsdokumentDatum.getDay()
                },
                text: {
                    headline: ratsdokument.class
                },
                unique_id: uniqueId
            };

            // Befülle diese Slide entsprechend des Dokumenttyps            
            slide = this.classDependingSlide(slide, ratsdokument);

            // Übernehme diese Slide in die Timeline Datenstruktur
            slides.push(slide);
        });

        return { events: slides };
    } 

    /**
     * Methode generiert eine Dokumenttyp spezifischen Look der übergebenen Slide
     * @param dokument 
     */
    private classDependingSlide(slide: TimelineSlide, dokument): TimelineSlide {
        if(dokument.class === "Beratungsunterlage") {

            (dokument as Beratungsunterlage);

            const slideInstance = new BeratungsunterlageSlide(dokument);

            // Wir cachen das Datenobjekt zu dieser Slide unter seiner eindeutigen unique_id 
            this.cache(slide.unique_id, slideInstance);

            // DEBUG
            console.log(this.slideInstance(slide.unique_id));
            // DEBUG

            slide = slideInstance.adjustJson(slide);

        } else if(dokument.class === "Protokoll") {

            (dokument as Protokoll);

            const slideInstance = new ProtokollSlide(dokument);
            
            // Wir cachen unser Slideobject zu dieser Slide unter seiner eindeutigen unique_id 
            this.cache(slide.unique_id, slideInstance);

            // DEBUG
            console.log(this.slideInstance(slide.unique_id));
            // DEBUG

            slide = slideInstance.adjustJson(slide);
            
        } else {
            throw new Error("Es wurde ein Dokumententyp gefunden, der nicht unterstützt wird: "+ dokument.class);
        }
        return slide;
    }
}