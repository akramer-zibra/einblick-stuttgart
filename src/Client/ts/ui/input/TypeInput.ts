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

    /**
     * Methode aktiviert die übergebenen Dokumenttypen in dieserm Filter 
     * @param types 
     */
    activate(types: string[]) {

        // Iteriere alle Dokumenttypen-Checkboxen
        $('.app__types').toArray().forEach(element => {
            
            // Aktiviere die Checkbox, wenn der entsprechende Typ im Argument enthalten ist
            $(element).prop('checked', (types.indexOf($(element).attr('data-type')) >= 0));
        });
    } 
}