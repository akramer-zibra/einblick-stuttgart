export interface Person {
    name: string,
    funktion?: string, 
    partei?: string,     // Optional, weil nicht alle eteiligten (Bsp. OB Kuhn, Verwaltungsmitarbeitende, ...) keine Partei bzw. Fraktion besitzen
    fraktion?: string,   // s.o.
    profilseite?: string
}
