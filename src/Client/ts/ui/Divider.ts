import $ from "jquery";

export class Divider {

    /**
     * Methode scrollt den Browser bis zum Divider
     */
    static scrollTo() {
        $('html, body').animate({
            scrollTop: $("#app__divider").offset().top - 20    // ...nur soweit, dass wir den Titel des Devider noch lesen können
        }, 'slow');
    }

    /**
     * Methode ändert den Titel des Divider
     * @param text 
     */
    static setTitle(text: string) {
        $("#app__divider").attr('data-content', text);
    }

    /**
     * Methode setzt den Dividertext zurück
     */
    static reset() {
        $("#app__divider").attr('data-content', 'Ratsdokumente');
    }
}