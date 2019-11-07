import Bottle from 'bottlejs';
import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { RatsdokumenteHtmlClient } from './Ratsdokumente/data/html/RatsdokumenteHtmlClient';
import { RatsdokumenteResolver } from './Ratsdokumente/resolver/Ratsdokumente.resolver';
import { SuchergebnisAntraegeScraper } from './Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisAntraege.scraper';
import { SuchergebnisBunterlagenScraper } from './Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisBunterlagen.scraper';
import { SuchergebnisProtokolleScraper } from './Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisProtokolle.scraper';
import { SuchergebnisStellungnahmenScraper } from './Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisStellungnahmen.scraper';
import { SuchergebnisTagesordnungenScraper } from './Ratsdokumente/scraper/Suchergebnisseite/SuchergebnisTagesordnungen.scraper';

// Initialisisiere bottlejs dependency container
const bottle = new Bottle();

// Definiere services und factories
bottle.factory('RatsdokumenteResolver', RatsdokumenteResolver.build);

// Scraper
bottle.service('SuchergebnisBunterlagenScraper', SuchergebnisBunterlagenScraper);
bottle.service('SuchergebnisProtokolleScraper', SuchergebnisProtokolleScraper);
bottle.service('SuchergebnisAntraegeScraper', SuchergebnisAntraegeScraper);
bottle.service('SuchergebnisStellungnahmenScraper', SuchergebnisStellungnahmenScraper);
bottle.service('SuchergebnisTagesordnungenScraper', SuchergebnisTagesordnungenScraper);

// Datenquellen
bottle.service('RatsdokumenteHtmlClient', RatsdokumenteHtmlClient);


// Definiere GraphQL API mit resolvern aus dem IoC container
const resolvers = {
    Query: {
        ratsdokumente: (_, {suchbegriff, dokumenttypen}) => bottle.container.RatsdokumenteResolver.resolve(suchbegriff, dokumenttypen),
        beratungsunterlagen: (_, {suchbegriff}) => bottle.container.RatsdokumenteResolver.resolve(suchbegriff, ["Beratungsunterlage"]),
        protokolle: (_, {suchbegriff}) => bottle.container.RatsdokumenteResolver.resolve(suchbegriff, ["Protokoll"]),
        antraege: (_, {suchbegriff}) => bottle.container.RatsdokumenteResolver.resolve(suchbegriff, ["Antrag"]),
        stellungnahmen: (_, {suchbegriff}) => bottle.container.RatsdokumenteResolver.resolve(suchbegriff, ["Stellungnahme"]),
        tagesordnungen: (_, {suchbegriff}) => bottle.container.RatsdokumenteResolver.resolve(suchbegriff, ["Tagesordnung"])
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

