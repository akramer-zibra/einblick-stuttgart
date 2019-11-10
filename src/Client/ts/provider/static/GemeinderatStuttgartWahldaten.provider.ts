import { TimelineEra } from "../../ui/timeline";

/**
 * Stuttgart Wahldaten von Webseite
 * @see https://servicex.stuttgart.de/lhs-services/komunis/documents/7653_1_Faltblatt_Stuttgarter_Wahldaten___Ausgabe_2018.PDF
 * 
 * Mehr Informationen
 * https://www.stuttgart.de/img/mdb/item/673539/144734.pdf
 */
export class GemeinderatStuttgartWahldaten {

    /**
     * Methode gibt Stuttgart Wahldaten in Timelinejs Era Format
     * ACHTUNG: Die Zeiträume von Wahltag bis Wahltag
     */
    getTimelineWahldaten(): TimelineEra[] {

        return [{
            text: {headline: "GRÜNE, CDU, ..."},  // GRÜNE, ...
            start_date: {year: 2019, month: 5, day: 26}, // 26.05.2019 
            end_date: {year: 2024, month: 5, day: 25} // - 25.05.2024
        },{
            text: {headline: "CDU, GRÜNE, ..."},       // CDU, GRÜNE, ...
            start_date: {year: 2014, month: 5, day: 25}, // 25.05.2014
            end_date: {year: 2019, month: 5, day: 25} // - 25.05.2019
        },{
            text: {headline: "GRÜNE, CDU, ..."},       // GRÜNE, CDU, ...
            start_date: {year: 2009, month: 6, day: 7}, // 07.06.2009 
            end_date: {year: 2014, month: 5, day: 24}    // - 24.05.2014
        },{
            text: {headline: "CDU, SPD, ..."},       // CDU, SPD, ...
            start_date: {year: 2004, month: 6, day: 13}, // 13.06.2004 
            end_date: {year: 2009, month: 6, day: 6}    // - 06.06.2009
        },{
            text: {headline: "CDU, SPD, ..."},       // CDU, SPD, ...
            start_date: {year: 1999, month: 10, day: 24}, // 24.10.1999 
            end_date: {year: 2004, month: 6, day: 12}    // - 12.06.2004
        }];
    }

    /**
     * Methode liefert Quellen dieser Wahldaten
     */
    getSourceUrls(): string[] {
        return ["https://servicex.stuttgart.de/lhs-services/komunis/documents/7653_1_Faltblatt_Stuttgarter_Wahldaten___Ausgabe_2018.PDF"];
    }
}