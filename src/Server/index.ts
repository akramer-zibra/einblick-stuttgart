import { GraphQLServer } from 'graphql-yoga';
import express from 'express';
import { TimelineResolver } from './Resolver/TimelineResolver';
import { BeratungsunterlagenResolver } from './Resolver/BeratungsunterlagenResolver';

// Instatiate Stream resolver
const timelineResolver = new TimelineResolver();
const bunterlagenResolver = new BeratungsunterlagenResolver();

// Definde API resolvers
const resolvers = {
    Query: {
        info: () => `This is the fresh API`,
        timelineAll: (_, {search}) => timelineResolver.resolve(search),
        beratungsunterlagen: (_, {search}) => bunterlagenResolver.resolve(search)
    },
}

// Initiate API server
const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers
}); 

// Graphserver uses express.js internally
// server.express.use(...);
server.express.get('/test', function(req, res) {
    res.send('Hello World');
});

// Configure static assets folder
server.express.use('/', express.static('public'));


// Server config
let config = {
    endpoint: '/endpoint', 
    playground: '/playground', 
    subscriptions: '/subscriptions'
}

// Start API server with custom routes
server.start(config, () => {
    console.log(`Server is running on http://localhost:4000`);
});

