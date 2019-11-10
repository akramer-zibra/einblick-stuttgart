import axios from 'axios';
import { DataClient } from '../../../interfaces';

export class GemeinderatHtmlClient implements DataClient {

    /* Axios client Instanz */
    private client;

    /** Default POST Anfrage Header */
    private headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
        "User-Agent": "Node.js/Axios"
    };

    /**
     * Konstruktor
     */
    constructor() {

        // Instantiiere axios Client
        this.client = axios.create({
            baseURL: 'https://www.stuttgart.de',
            timeout: 20000,
            headers: this.headers
        });
    };

    /**
     * Methode liest die Gemeinderatmitglieder von der Stadt Stuttgart Webseite
     */
    getMitgliederGemeinderat(): Promise<string> {

        return new Promise((resolve, reject) => {

            this.client.get('/gemeinderat')
                .then((response) => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }    
}