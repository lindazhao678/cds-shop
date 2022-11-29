// ENTRY FILE
// Import libaries
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const glob = require('glob')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

// Import connection
const { sequelize } = require('./helpers/dbHelper')

// Testing the connection
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// Setup Express
const app = express()

// Middleware for Cross Origin Resource Sharing
app.use(cors())

// Find all resolvers and put them in registerResolvers array
let resolvers = glob.sync('graphql/*/*Resolver.js')
let registerResolvers = []
for (const resolver of resolvers) {
    registerResolvers = [...registerResolvers, require('./' + resolver)]
}

// Find all types and put them in registerTyps array
let types = glob.sync('graphql/*/*Type.js')
let registerTypes = []
for (const type of types) {
    registerTypes = [...registerTypes, require('./' + type)]
}

// Create Schema - Merge types and resolvers with graphql-tool (makeExecutableSchema)
const schema = makeExecutableSchema({ typeDefs: mergeTypeDefs(registerTypes), resolvers: mergeResolvers(registerResolvers) })

// Route for graphql
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))

// Sync db tables & server listening
sequelize
    .sync({ alter: true }) //sync db tables
    .then(() => { 
        app.listen(4000, () => console.log('Listening on port 4000'))
    });
