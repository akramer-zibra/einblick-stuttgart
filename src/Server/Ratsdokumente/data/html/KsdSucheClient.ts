import axios from 'axios';
import iconv from 'iconv-lite';
import qs from 'query-string';
import { DataClient } from '../../../interfaces.d';

export class KsdSucheClient implements DataClient {

    /* Axios client Instanz */
    private client;

    /** Default POST Anfrage Header */
    private headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "www.domino1.stuttgart.de",
        "Origin": "https://www.domino1.stuttgart.de",
        "Referer": "https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf/masustart",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Node.js/Axios"
    };

    /** Default POST Anfrage Parameter */
    private params = { 
        "__Click": "0", 
        "%%Surrogate_AuswahlDatenbank": "1", 
        "AuswahlDatenbank": "Aktueller+Datenbestand", 
        "%%Surrogate_Auswahl": "1", 
        "Auswahl": [
            "Beratungsunterlagen", 
            "Protokolle", 
            "_a85n78sk4ctig_", 
            "Stellungnahmen", 
            "Tagesordnungen"
        ], 
//        "Suchbegriff1": "", 
//        "Suchbegriff2": "", 
//        "Suchbegriff3": "", 
        "%%Surrogate_AnzahlDokAuswahl": "1", 
        "AnzahlDokAuswahl": "20", 
        "Dokumententyp": "Suche", 
        "$PublicAccess": "1", 
        "SaveOptions": "0", 
        "AnzahlDok": "50"   // Maximum ist serverseitig auf 50 limitiert 
    }

    /**
     * Konstruktor
     */
    constructor() {

        // Instantiiere axios Client
        this.client = axios.create({
            baseURL: 'https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf',
            timeout: 20000,
            headers: this.headers
        });
    };

    /**
     * Methode macht eine Suchanfrage an den Ratsdokumente-Server
     * @param words 
     */
    submitSearch(words: string): Promise<string> {

        // Nutze default Parameter
        const params = this.params;

        // Achtung!: Die Suchanfrage ist nicht konsistent url kodiert.
        // Die Suche funktioniert nicht richtig, wenn alles konsequent kodiert ist

        // Wandle die Anfrage Parameter in einen einzigen String um
        const stringifiedParams = qs.stringify(params, {encode: false});    
        
        // Wandle den Suchbegriff in einen url kodierten String um
        const encodedSearchString = qs.stringify({Suchbegriff1: words}, {encode: true});

        // ...und verbinde unkodierten mit kodiertem Teil der Parameter
        const requestParams = [stringifiedParams, encodedSearchString].join('&');

        // 
        return new Promise((resolve, reject) => {

            // Schicke eine POST Anfrage mit www-form-encoded Formulardaten
            this.client.post('/masustart', requestParams, { responseType: 'arraybuffer' })
                .then((response) => {
                    
                    // Dekodiere die HTML Antwort von windows1252 in utf8
                    const decodedStr = iconv.decode(response.data, 'win1252');

                    // Gib dekodierte HTML Antwort im Code weiter
                    resolve(decodedStr);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}