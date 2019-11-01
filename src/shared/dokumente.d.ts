export interface Beratungsunterlage {
    class: Dokumenttyp,
    datum: Date,
    id: string,
    titel: string,
    ausschuss: string,
    dokument: Datei,
    anhaenge?: Datei[]
}

export interface Protokoll {
    class: Dokumenttyp,
    datum: Date,
    top: string,
    nnr: string,
    betreff: string,
    ausschuss: string,
    protokoll: Datei,
    verhandlung?: Beratungsunterlage
}

export interface Antrag {
    class: Dokumenttyp,
    datum: Date,
    bezeichnung: string,
    betreff: string,
    fraktionen: string,
    dokument: Datei
}

export interface Datei {
    class: Dateityp,
    url: string,
    titel: string,
    mime: string
}

// Wir benutzen hier einen Type anstatt eines enum!
// @See https://lukasbehal.com/2017-05-22-enums-in-declaration-files/
// TLDR: TypeScript Declarations-Dateien werden nicht in JavaScript kompiliert.
//       Während der Laufzeit kann darum darauf nicht zugegriffen werden
export type Dokumenttyp = "Antrag" | "Beratungsunterlage" | "Protokoll";
export type Dateityp = "Datei";