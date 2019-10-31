import $ from "jquery";

export class Divider {

    /**
     * Methode scrollt den Browser bis zum Divider
     */
    static scrollTo() {
        $('html, body').animate({
            scrollTop: $("div[name='divider']").offset().top - 20    // ...nur soweit, dass wir den Titel des Devider noch lesen können
        }, 'slow');
    }

    /**
     * Methode ändert den Titel des Divider
     * @param text 
     */
    static setTitle(text: string) {
        $("div[name='divider']").data('content', text);
    }

    /**
     * Methode resettet den Dividertext
     */
    static reset() {
        $("div[name='divider']").data('content', 'Ratsdokumente');
    }
}