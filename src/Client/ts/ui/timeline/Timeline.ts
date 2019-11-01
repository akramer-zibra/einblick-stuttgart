declare const TL: any;  // Declares global TL object integrated with linked script file in index.html
import { TimelineData, TimelineSlide, SlideGenerator, TimelineSlideDefault } from ".";
import { BeratungsunterlageSlideGenerator } from "./slides/BeratungsunterlageSlideGenerator";
import { ProtokollSlideGenerator } from "./slides/ProtokollSlideGenerator";
import uuidv4 from 'uuid/v4';
import { AntragSlideGenerator } from "./slides/AntragSlideGenerator";
import { StellungnahmeSlideGenerator } from "./slides/StellungnahmeSlideGenerator";

export class Timeline {

    /** Referenz zu intermer Timeline Instanz */
    private timeline: any;

    /** Hashmap mit Arrays von listenern für bestimmte Events der Timeline */
    private listeners: any = {};

    /** Hashmap cached Objekt mit einer uuid */
    private cacheObjects: any = {};

    /** Konfiguriert Auswahl an Slide Typen und deren factory Methoden */
    private slideTypeFactories = {
        'Beratungsunterlage': BeratungsunterlageSlideGenerator.build,
        'Protokoll': ProtokollSlideGenerator.build,
        'Antrag': AntragSlideGenerator.build,
        'Stellungnahme': StellungnahmeSlideGenerator.build
    }

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
                initial_zoom: 5,
                language: 'de'
            });

        // Die registrierten event Listener mit der frischen Timeline verbinden
        Object.keys(this.listeners).forEach((event) => {
            this.listeners[event].forEach((listener) => {
                this.timeline.on(event, listener, this);
            });
        })

        // Wir signalisieren, dass die Timeline jetzt geladen ist
        // NOTICE: Damit die erste Slide auch schon angepasst werden kann
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

            // Wir generieren eine uuid für diese neue Slide
            // ...um die Datenstruktur, die zur Slide gehört, eindeutig zu cachen
            const uniqueId = uuidv4();

            // Starte mit den default Werten dieser Slide
            const slideDefault: TimelineSlideDefault = {
                unique_id: uniqueId
            };

            // Befülle diese Slide entsprechend des Dokumenttyps            
            const slide = this.generateSlideWithGenerator(slideDefault, ratsdokument);

            // Übernehme diese Slide in die Timeline Datenstruktur
            slides.push(slide);
        });

        return { events: slides };
    } 

    /**
     * Methode generiert eine Dokumenttyp spezifischen Look der übergebenen Slide
     * @param slideData 
     */
    private generateSlideWithGenerator(slideDefaults: TimelineSlideDefault, slideData): TimelineSlide {

        // Definiere eine Variable für unsere generische Slide Generator Instanz
        let slideGenerator: SlideGenerator|null = null;

        // Wir versuchen jede der konfigurierten Factorymethoden um eine Wrapper Instanz für die Daten zu bekommen
        Object.keys(this.slideTypeFactories).forEach((slideClassName) => {

            // Benutze diese Factory Methode und schaue ob eine Instanz damit erzeugt werden kann
            const instance = this.slideTypeFactories[slideClassName](slideData);
            if(instance !== null) { slideGenerator = instance; }            
        });

        // Wir haben einen Fehler, wenn wir keinen Generator zuordnen können
        if(slideGenerator === null) {
            throw new Error("Es liegen Daten vor, die wir nicht anzeigen können: "+ slideData.class);
        } 

        // Wir haben einen Generator gefunden und casten die Instanz entsprechend 
        slideGenerator = (slideGenerator as SlideGenerator);

        // Wir cachen die Generator Instanz von dieser Slide mit deren unique_id
        this.cache(slideDefaults.unique_id, slideGenerator);

        // Generiere das JSON für diese Slide mithilfe des Generators
        // ...und gib dieses Slide Objekt zurück
        return slideGenerator.generateWith(slideDefaults);
    }
}