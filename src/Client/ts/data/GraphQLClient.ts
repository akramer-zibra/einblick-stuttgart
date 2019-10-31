import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


export class GraphQLClient {

    /** Referenz zu notwendigem Apollo Client */
    private client: any = null;

    /**
     * Konstruktor
     */
    constructor() {

        const cache = new InMemoryCache();
        const link = new HttpLink({
            uri: 'http://localhost:4000/endpoint'
        });

        this.client = new ApolloClient({
            cache,
            link,
            defaultOptions: {   // NOTICE: Wir deaktivieren den Client cache für die Etwicklung
                watchQuery: {
                  fetchPolicy: 'no-cache',  
                  errorPolicy: 'ignore',
                },
                query: {
                  fetchPolicy: 'no-cache',
                  errorPolicy: 'all',
                },
              }
        });
    }

    /**
     * Methode macht eine query-Abfrage mit dem übergebenen query-Objekt
     * @param query 
     */
    query(query) {
      return this.client.query(query);
    } 
}
