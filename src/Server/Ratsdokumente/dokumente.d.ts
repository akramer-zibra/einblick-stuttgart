export enum Dokumenttyp {
    ANTRAG = "Antrag",
    BERATUNGSUNTERLAGE = "Beratungsunterlage"    
}

export interface Buchungsunterlage {
    class: string
    datum: Date,
    id: string,
    titel: string,
    ausschuss: string,
    beratungsvorlage: Datei,
    anhaenge?: Datei[]
}

export interface Datei {
    class: string,
    url: string,
    titel: string,
    typ: string
}