declare const TL: any;  // Declares global TL object integrated with linked script file in index.html

export class Timeline {

    /** Reference to this page's timeline object */
    private timeline: any;

    init() {

        // 
        const timelineJson = {}; // replace make_the_json() with the JSON object you created

        // two arguments: the id of the Timeline container (no '#')
        // and the JSON object or an instance of TL.TimelineConfig created from
        // a suitable JSON object
        this.timeline = new TL.Timeline('timeline-embed', timelineJson, {
                start_at_end: true,
                default_bg_color: {r:0, g:0, b:0},
                timenav_height: 250
            });

        console.log('Timeline initialisiert...');
    }
}