import { GraphQLServer } from 'graphql-yoga';
import express from 'express';
import { RatsdokumenteResolver } from './Resolver/Ratsdokumente.resolver';

// Instantiiere resolver für Ratsdokumente query
const ratsdokumenteResolver = new RatsdokumenteResolver();

// Definiere GraphQL API resolver
const resolvers = {
    Query: {
        ratsdokumente: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff)
    },
    Dokument: {     
        __resolveType(dokument, context, info) {    // Wir brauchen einen zusätzlichen Resolver, der Untertypen des abstrakten Typs Dokument auflösen kann 
            if (dokument.class !== undefined) {
                return dokument.class
            }
            return null;
        },
    },
}

// Initialisiert GraphQL Server Instanz
const server = new GraphQLServer({
    typeDefs: './src/Server/schema.graphql',
    resolvers
}); 

// GraphQL Server benutzt intern express.js 
// server.express.use(...);
server.express.get('/test', (req, res) => {
    res.send('Hello World');
});

// Konfiguriere ein Verzeichnis für statische Asset-Dateien 
server.express.use('/', express.static('public'));


// Konfiguration für Server Instanz
const config = {
    endpoint: '/endpoint', 
    playground: '/playground', 
    subscriptions: '/subscriptions'
}

// Starte den GraphQL Server mit unseren speziellen Routen
server.start(config, () => {
    console.log(`Server is running on http://localhost:4000`);
});

