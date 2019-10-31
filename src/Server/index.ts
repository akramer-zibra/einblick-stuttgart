import { GraphQLServer } from 'graphql-yoga';
import express from 'express';
import { RatsdokumenteResolver } from './Resolver/Ratsdokumente.resolver';

// Instatiate Stream resolver
const ratsdokumenteResolver = new RatsdokumenteResolver();

// Definde API resolvers
const resolvers = {
    Query: {
        ratsdokumente: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff)
    },
    Dokument: {     
        __resolveType(dokument, context, info) {    // We need a resolver method for this union type
            if (dokument.class !== undefined) {
                return dokument.class
            }
            return null;
        },
    },
}

// Initiate API server
const server = new GraphQLServer({
    typeDefs: './src/Server/schema.graphql',
    resolvers
}); 

// Graphserver uses express.js internally
// server.express.use(...);
server.express.get('/test', (req, res) => {
    res.send('Hello World');
});

// Configure static assets folder
server.express.use('/', express.static('public'));


// Server config
const config = {
    endpoint: '/endpoint', 
    playground: '/playground', 
    subscriptions: '/subscriptions'
}

// Start API server with custom routes
server.start(config, () => {
    console.log(`Server is running on http://localhost:4000`);
});

