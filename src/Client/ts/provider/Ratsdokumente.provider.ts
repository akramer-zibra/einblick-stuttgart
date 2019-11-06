import gql from "graphql-tag";
import { GraphQLClient } from "../data/GraphQLClient";

export class RatsdokumenteProvider {

    /** Referenzen zu anderen Objekten */
    private graphQLClient: GraphQLClient;

    /** Vorlage für API Anfrage */
    private API_CALL_QUERY = gql`
    query Ratsdokumente($suchbegriff: String!, $dokumenttypen: [String]) {
        ratsdokumente(suchbegriff: $suchbegriff, dokumenttypen: $dokumenttypen) {
            __typename
            ... on Beratungsunterlage {
                type
                datum
                bezeichnung
                titel
                ausschuss
                dokument {url, titel, mime}
                anhaenge {url, titel, mime}
            }
            ... on Protokoll {
                type
                datum
                nnr
                betreff
                ausschuss
                protokoll {url, titel, mime}
            }
            ... on Antrag {
                type
                datum
                bezeichnung
                betreff
                fraktionen
                dokument {url, titel, mime}
            }
            ... on Stellungnahme {
                type
                datum
                refAntrag
                betreff
                fraktionen
                dokument {url, titel, mime}
            }
            ... on Tagesordnung {
                type
                datum
                ausschuss
                dokument {url, titel, mime}
            }
        }
    }`;

    /**
     * Statische factory Methode
     * @param container 
     */
    static build(container) {
        return new RatsdokumenteProvider(container.GraphQLClient);
    }

    /**
     * Konstruktor
     * @param graphQLclient 
     */
    constructor(graphQLclient: GraphQLClient) {

        // Abhängigkeiten injizieren
        this.graphQLClient = graphQLclient;
    }

    /**
     * Methode fragt die GraphQL API mit dem übergebenen Stichwort ab
     * @param suchbegriff 
     */
    queryRatsdokumenteByText(suchbegriff: string, dokumenttypen: string[] = ['*']): Promise<any> {

        return new Promise((resolve, reject) => {

            // Benutze GraphQL Client um an die Daten zu kommen
            this.graphQLClient
                .query({
                    query: this.API_CALL_QUERY,
                    variables: {
                        suchbegriff,
                        dokumenttypen
                    } 
                })
                .then((result) => {
                    // NOTICE: Wir geben nur den Daten-Payload der Abfrage weiter
                    resolve(result.data);
                })
                .catch(reject);
        });
    }
}