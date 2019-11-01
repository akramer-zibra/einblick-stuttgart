import gql from "graphql-tag";
import { GraphQLClient } from "../data/GraphQLClient";

export class RatsdokumenteProvider {

    /** Referenzen zu anderen Objekten */
    private graphQLClient: GraphQLClient;

    /** Vorlage für API Anfrage */
    private API_CALL_QUERY = gql`
    query Ratsdokumente($suchbegriff: String!) {
        ratsdokumente(suchbegriff: $suchbegriff) {
            __typename
            ... on Beratungsunterlage {
                class
                datum
                id
                titel
                ausschuss
                vorlage {url, titel, mime}
                anhaenge {url, titel, mime}
            }
            ... on Protokoll {
                class
                datum
                nnr
                betreff
                ausschuss
                protokoll {url, titel, mime}
            }
            ... on Antrag {
                class
                datum
                bezeichnung
                betreff
                fraktionen
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
    queryRatsdokumenteByText(suchbegriff: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Benutze GraphQL Client um an die Daten zu kommen
            this.graphQLClient
                .query({
                    query: this.API_CALL_QUERY,
                    variables: {
                        suchbegriff
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