import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';


export class GraphQLClient {

    /** Reference to Apollo Client */
    client: any = null;

    /**
     * Constructor method
     */
    constructor() {

        const cache = new InMemoryCache();
        const link = new HttpLink({
            uri: 'http://localhost:4000/endpoint'
        });

        this.client = new ApolloClient({
            cache,
            link
        });
    }
}
