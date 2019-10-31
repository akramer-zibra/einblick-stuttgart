import gql from "graphql-tag";
import { GraphQLClient } from "../data/GraphQLClient";

export class RatsdokumenteProvider {

    /** Referenzen zu anderen Objekten */
    private graphQLClient: GraphQLClient;

    /** Vorlage für API Anfrage */
    private API_CALL_QUERY = gql`
    query Ratsdokumente($keyword: String!) {
        ratsdokumente(suchbegriff: $keyword) {
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
        }
    }`;

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
     * @param keyword 
     */
    queryRatsdokumenteByKeyword(keyword: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Benutze GraphQL Client um an die Daten zu kommen
            this.graphQLClient
                .query({
                    query: this.API_CALL_QUERY,
                    variables: {
                        keyword
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