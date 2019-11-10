import Bottle from 'bottlejs';
import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import GemeinderatModulFactory from './Gemeinderat/module';
import { GemeinderatResolver } from './Gemeinderat/resolver/Gemeinderat.resolver';
import RatsdokumenteModulFactory from './Ratsdokumente/module';
import { RatsdokumenteResolver } from './Ratsdokumente/resolver/Ratsdokumente.resolver';

// Initialisisiere bottlejs dependency container
const bottle = new Bottle();

// Wir legen auch eine Referenz zu bottlejs in den IoC container
bottle.value('bottle', bottle);

// Initialisiere vorhandene Module
RatsdokumenteModulFactory(bottle.container);
GemeinderatModulFactory(bottle.container);

// Wir holen unsere Resolver vom IoC container
const ratsdokumenteResolver: RatsdokumenteResolver = bottle.container.RatsdokumenteResolver;
const gemeinderatResolver: GemeinderatResolver = bottle.container.GemeinderatResolver;

// Definiere GraphQL API
const resolvers = {
    Query: {
        ratsdokumente: (_, {suchbegriff, dokumenttypen}) => ratsdokumenteResolver.resolve(suchbegriff, dokumenttypen),
        beratungsunterlagen: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff, ["Beratungsunterlage"]),
        protokolle: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff, ["Protokoll"]),
        antraege: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff, ["Antrag"]),
        stellungnahmen: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff, ["Stellungnahme"]),
        tagesordnungen: (_, {suchbegriff}) => ratsdokumenteResolver.resolve(suchbegriff, ["Tagesordnung"]),
        gemeinderatMitglieder: (_) => gemeinderatResolver.resolveMitglieder(),
        gemeinderatWahldaten: (_) => gemeinderatResolver.resolveWahldaten()
    },
    Dokument: {     
        __resolveType(dokument, context, info) {    // Wir brauchen einen zusätzlichen Resolver, der Untertypen des abstrakten Typs Dokument auflösen kann 
            if (dokument.type !== undefined) {
                return dokument.type
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
/*server.express.get('/test', (req, res) => {
    res.send('Hello World');
});*/

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

