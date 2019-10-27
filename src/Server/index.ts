import { GraphQLServer } from 'graphql-yoga';
import { Repository } from './repository';
import express from 'express';

// Instantiate new Repository object
const repository = new Repository();

// Definde API resolvers
const resolvers = {
    Query: {
        info: () => `This is the fresh API`,
    },

    Mutation: {
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

