import axios from 'axios';
import fs from 'fs';
import qs from 'query-string';

export class KsdSucheClient {

    /* Axios client instance */
    private axios = null;
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
        "User-Agent": "Node.js/axios"
    };

    public constructor() {};

    /**
     * Method does an http POST call to this endpoit
     * @param keyword 
     */
    public submitSearch(keyword: string) {

        /*
        let demo = { 
            "Antwortkopfzeilen (167 B)": { 
                "headers": [{ 
                    "name": "Content-Length", 
                    "value": "41443" 
                }, { 
                    "name": "Content-Type", 
                    "value": "text/html; charset=ISO-8859-1" 
                }, { 
                    "name": "Date", 
                    "value": "Mon, 28 Oct 2019 16:01:19 GMT" 
                }, { 
                    "name": "Strict-Transport-Security", 
                    "value": "max-age=604800" 
                }] 
            }, 
            "Anfragekopfzeilen (613 B)": { 
                "headers": [{ 
                    "name": "Accept-Encoding", 
                    "value":  
                }, { 
                    "name":  
                    "value": 
                }, { 
                    "name": "Cache-Control", 
                    "value": "max-age=0" 
                }, { 
                    "name": , 
                    "value":  
                }, { 
                    "name": "Content-Length", 
                    "value": "407" 
                }, { 
                    "name": , 
                    "value":  
                }] 
            } 
        };
        */

        // Instatiate axios client
        let client = axios.create({
            baseURL: 'https://www.domino1.stuttgart.de/web/ksd/KSDRedSystem.nsf',
            timeout: 2000,
            headers: this.headers
        });

        let params = { 
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
            "Suchbegriff1": "Stuttgart 28", 
            "Suchbegriff2": "", 
            "Suchbegriff3": "", 
            "%%Surrogate_AnzahlDokAuswahl": "1", 
            "AnzahlDokAuswahl": "20", 
            "Dokumententyp": "Suche", 
            "$PublicAccess": "1", 
            "SaveOptions": "0", 
            "AnzahlDok": "20" 
        };

        // Post this generated form data with www-form-encoded parameters
        client.post('/masustart', qs.stringify(params))
          .then(function (response) {
            
            // TEST write response to filesystem
            //console.log(response.data);
            fs.writeFile('./temp/ergebnis.html', response.data, {}, function(err) {
                if(err) { console.error(err); }
            });

          })
          .catch(function (error) {
            console.log(error);
          });

    }
}