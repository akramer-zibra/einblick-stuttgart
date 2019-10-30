export interface Buchungsunterlage {
    class: Dokumenttyp
    datum: Date,
    id: string,
    titel: string,
    ausschuss: string,
    vorlage: Datei,
    anhaenge?: Datei[]
}

export interface Datei {
    class: Dateityp,
    url: string,
    titel: string,
    mime: string
}

// We use type instead of enum!
// @See https://lukasbehal.com/2017-05-22-enums-in-declaration-files/
// TLDR: ...definition files are not compiled to JS
export type Dokumenttyp = "Antrag" | "Beratungsunterlage";
export type Dateityp = "Datei";