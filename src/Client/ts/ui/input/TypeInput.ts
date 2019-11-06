import $ from 'jquery';

export class TypeInput {

    /**
     * Methode lädt die Werte der ausgewählten Dokumenttypen
     * und gibt diese zurück
     */
    values(): string[] {
        const result: string[] = [];

        // Wir selektieren alle ausgewählten Typen und ermitteln deren Werte
        $('.app__types:checked').toArray().forEach(element => {
            result.push($(element).attr('data-type'));
        });
        return result;
    }
}