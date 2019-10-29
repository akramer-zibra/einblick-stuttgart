import axios from 'axios';
import fs from 'fs';
import qs from 'query-string';
import iconv from 'iconv-lite';

export class KsdSucheClient {

    /* Axios client instance */
    private client;

    /** Default POST call headers */
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

    /** Default POST call parameters */
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
        "Suchbegriff1": "", 
        "Suchbegriff2": "", 
        "Suchbegriff3": "", 
        "%%Surrogate_AnzahlDokAuswahl": "1", 
        "AnzahlDokAuswahl": "20", 
        "Dokumententyp": "Suche", 
        "$PublicAccess": "1", 
        "SaveOptions": "0", 
        "AnzahlDok": "50"   // Maximum is 50 
    }

    /**
     * Class constructor method
     */
    constructor() {
        
        // Instatiate axios client
        this.client = axios.create({
            baseURL: 'https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf',
            timeout: 20000,
            headers: this.headers
        });
    };

    /**
     * Method does an http POST call to this endpoit
     * @param keyword 
     */
    submitSearch(keyword: string): Promise<string> {

        // Use default params 
        const params = this.params;
        params.Suchbegriff1 = keyword.replace(' ', '+');    // We replace whitespaces with + for concattenated search

        // Stringify params object for POST call
        const encodedParams = qs.stringify(params, {encode: false});
        
        // 
        return new Promise((resolve, reject) => {

            // Post this generated form data with www-form-encoded parameters
            this.client.post('/masustart', encodedParams, { responseType: 'arraybuffer' })
                .then((response) => {
                    
                    // Change encoding from windows1252 to utf8
                    const decodedStr = iconv.decode(response.data, 'win1252');

                    // We resolve this promise with response HTML body data
                    resolve(decodedStr);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}