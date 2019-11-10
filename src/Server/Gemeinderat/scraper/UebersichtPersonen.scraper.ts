import dateUtil from 'date-and-time';
import 'date-and-time/locale/de';
import { Person } from '../../../shared/gemeinderat';
import { Scraper } from '../../interfaces';

/**
 * Achtung: Webseite besitzt Copyright!
 */
export class UebersichtPersonenScraper implements Scraper<Person> {

    /** url path */
    private urlPath: string;

    /**
     * Konstruktor
     */
    constructor(urlPath:string = "https://www.stuttgart.de") {

        // Initiale Optionen 
        this.urlPath = urlPath;

        // Wir setzen Deutschland als locale für die Datumsformatierung
        dateUtil.locale("de");
    };

    /**
     * Methode zieht "Personen" Daten aus dem übergebenen cheerio DOM Objekt
     * @param $
     */
    scrape($: CheerioStatic): Person[] {

        throw new Error('Funktioniert nocht nicht...keine Ahung warum');

        const result: Person[] = [];

        // Wir definieren Hilfsvariablen
        let headlineIndex = 0;
        let pointer;

        // Wir selektrieren alle interessanten Headlines und machen ein Array daraus
        const headlines = $('.content-inner-wrapper').find('h3').toArray();

        // Wir gehen alle Headlines durch... 
        headlines.forEach(el => {

            // Die letzte Headline überspringen wir, weil er im x-1 Durchlauf schon behandelt wurde
            if(headlineIndex+1 === headlines.length) { return; }

            // Macht aus dem selektierten HTML-Element einen DOM poiner 
            pointer = $(el);

            // Wir behandeln den ersten Block besonders, 
            // weil er anders aufgebaut ist als die anderen
            if(headlineIndex === 0) { 

                // Extrahiere Gemeinderatsvorsitz
                result.push(this.extractGemeinderatsvorsitz(pointer));

            // Alle 2.,4.,.. h3-Überschriften beginnen neue Fraktionen 
            } else if((headlineIndex+1) > 1 && ((headlineIndex+1) % 2) === 0) {
                
                // HTML-Struktur...
                // h3 -> Fraktion
                // p -> Funktionäre
                // h3 -> Mitglieder
                // p -> table -> Personen 

                const fraktion = pointer.text();
                console.log(fraktion);

                // Extrahiere Funktionen und deren Funktionäre
                const funktionen = this.extractFunktionen(pointer);

                console.log(funktionen);

                // Wir springen mit dem Pointer zur nächsten Überschrift (Mitgliederliste)
                pointer = $(headlines[headlineIndex+1]);
                console.log(pointer.text());

                /* Extrahiere Personen */

                console.log(pointer.closest('p').first().children().toArray().length);

                // Wir erzeugen ein Array mit allen Mitglieder-Kacheln
                pointer.closest('p').first().find('td').toArray().forEach(td => {

                    console.log($(td).find('.intxt').text());

                    // Wir ziehen die Mitgliedsdaten heraus und erzeugen ein Person-Datenobjekt daraus
                    const mitglied: Person = {
                        name: $(td).find('.intxt').text().split('\n')[0].replace(',', ''),
                        partei: $(td).find('.intxt').text().split('\n')[1],
                        fraktion,
                        profilseite: $(td).find('.intxt').attr('href'),
                    }

                    // Ergänzt Funktion, falls vorhanden
                    if(Object.keys(funktionen).indexOf(mitglied.name) >= 0) {
                        mitglied.funktion = funktionen[mitglied.name];
                    }

                    // 
                    result.push(mitglied);
                });
            }

            // Wir zählen diese Headline als verarbeitet
            headlineIndex++;
        });

        return result;
    }

    /**
     * Methode extrahiert ein Person-Datenobjekt vom übergebenen Pointer ausgehend
     * @param pointer 
     */
    private extractGemeinderatsvorsitz(pointer): Person {
        const gemeinderatsVorsitz = pointer.nextAll('p').first().find('.intxt');

        return {
            name: gemeinderatsVorsitz.text().split(' ').slice(1).join(' '), // Schneidet das erste Wort., i.d.R. OB... aus dem String
            funktion: gemeinderatsVorsitz.text().split(' ').shift(),        // Erster Token ist Funktion der Person
            profilseite: this.urlPath + gemeinderatsVorsitz.attr('href')
        };
    }

    /**
     * Methode extrahiert Funktionen der Fraktionsmitglieder vom
     * übergebenen Pointer ausgehend
     * @param pointer 
     */
    private extractFunktionen(pointer): any {
        console.log(pointer.nextAll('p').first().html());

        const funktionen = {}
        const funktionaere = pointer.nextAll('p').first().text().split('\n');
        funktionaere.filter((el, idx, arr) => {
            el as string;   
            if(el.indexOf(':') >= 0) {
                const person = arr[idx+1];
                funktionen[person] = el.replace(':', '');       
            }
        });
        return funktionen;
    }
}