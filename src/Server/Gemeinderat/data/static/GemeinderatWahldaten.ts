import date from 'date-and-time';

export class GemeinderatWahldaten {

    /**
     * Methode gibt Stuttgart Wahldaten in Timelinejs Era Format
     * ACHTUNG: Die Zeiträume sind von Wahltag bis Wahltag
     *
     * Stuttgart Wahldaten von Webseite
     * @see https://servicex.stuttgart.de/lhs-services/komunis/documents/7653_1_Faltblatt_Stuttgarter_Wahldaten___Ausgabe_2018.PDF
     *
     * Mehr Informationen zu vergangenen Wahlergebnissen
     * https://www.stuttgart.de/img/mdb/item/673539/144734.pdf
     */
    getWahldaten(): any {

        return [{
            parteien: [{name: "CDU", sitze: 11},
                       {name: "GRÜNE", sitze: 16},
                       {name: "SPD", sitze: 7},
                       {name: "Freie Wähler", sitze: 4},
                       {name: "FDP", sitze: 5},
                       {name: "SÖS", sitze: 3},
                       {name: "AfD", sitze: 4},
                       {name: "LINKE", sitze: 3},
                       {name: "PIRATEN", sitze: 1},
                       {name: "Stadtisten", sitze: 2},
                       {name: "Junge Liste", sitze: 1},
                       {name: "Tierschutzartei", sitze: 1},
                       {name: "Die PARTEI", sitze: 1},
                       {name: "Kein Fahrverbot", sitze: 1}],
            fraktionen: ["BÜNDNIS 90/DIE GRÜNEN", 
                         "CDU", 
                         "LINKE SÖS PIRATEN Tierschutzpartei", 
                         "SPD", 
                         "FDP",
                         "Freie Wähler",
                         "Alternative für Deutschland (AfD)",
                         "PULS"],
            wahltag: date.parse('26.05.2019', 'DD.MM.YYYY')
        },{
            parteien: [{name: "CDU", sitze: 17},
                       {name: "GRÜNE", sitze: 14},
                        {name: "SPD", sitze: 9},
                    {name: "Freie Wähler", sitze: 4},
                    {name: "FDP", sitze: 4},
                    {name: "SÖS", sitze: 3},
                    {name: "AfD", sitze: 3},
                    {name: "LINKE", sitze: 3},
                    {name: "PIRATEN", sitze: 1},
                    {name: "Stadtisten", sitze: 1},
                    {name: "Junge Liste", sitze: 1}],
            fraktionen: [],
            wahltag: date.parse('25.05.2014', 'DD.MM.YYYY')
        }, {
            parteien: [{name: "CDU", sitze: 15},
                        {name: "GRÜNE", sitze: 16},
                        {name: "SPD", sitze: 10},
                        {name: "Freie Wähler", sitze: 6},
                        {name: "FDP", sitze: 7},
                        {name: "SÖS", sitze: 3},
                        {name: "LINKE", sitze: 2}],
            fraktionen: [],
            wahltag: date.parse('07.06.2009', 'DD.MM.YYYY')
        },{
            parteien: [{name: "CDU", sitze: 21},
                        {name: "GRÜNE", sitze: 11},
                        {name: "SPD", sitze: 14},
                        {name: "Freie Wähler", sitze: 6},
                        {name: "FDP", sitze: 4},
                        {name: "SÖS", sitze: 1},
                        {name: "LINKE", sitze: 1}],
            fraktionen: [],
            wahltag: date.parse('13.06.2004', 'DD.MM.YYYY')
        },{
            parteien: [{name: "CDU", sitze: 25},
                        {name: "GRÜNE", sitze: 8},
                        {name: "SPD", sitze: 15},
                        {name: "Freie Wähler", sitze: 4},
                        {name: "FDP", sitze: 4},
                        {name: "LINKE", sitze: 1}],
            fraktionen: [],
            wahltag: date.parse('24.10.1999', 'DD.MM.YYYY')
        }];
    }

    /**
     * Methode liefert Quellen dieser Wahldaten
     */
    getSourceUrls(): string[] {
        return [
            "https://servicex.stuttgart.de/lhs-services/komunis/documents/7653_1_Faltblatt_Stuttgarter_Wahldaten___Ausgabe_2018.PDF",
            "https://www.stuttgart.de/img/mdb/item/673539/144734.pdf"
        ];
    }
}