import $ from "jquery";
import gql from "graphql-tag";
import { GraphQLClient } from "../data/GraphQLClient";

export class RatsdokumenteProvider {

    private graphQLClient: GraphQLClient;

    /** API call query template */
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
     * Constructor method for this class providing Ratsdokumente data
     * @param graphQLclient 
     */
    constructor(graphQLclient: GraphQLClient) {
        this.graphQLClient = graphQLclient;
    }

    /**
     * Method queries GraphQL API with given keyword string 
     * @param keyword 
     */
    queryRatsdokumenteByKeyword(keyword: string): Promise<any> {

        return new Promise((resolve, reject) => {

            // Load timeline events from GraphQL API
            this.graphQLClient
                .query({
                    query: this.API_CALL_QUERY,
                    variables: {
                        keyword
                    } 
                })
                .then((result) => {
                    // NOTICE we only pass the data payload
                    resolve(result.data);
                })
                .catch(reject);
        });
    }
}