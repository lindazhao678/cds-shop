const express = require('express')
const cors = require('cors')
const glob = require('glob')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

// Import connection
const { sequelize } = require('./helpers/dbHelper')

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// Setup Express
const app = express()

app.use(cors())

let resolvers = glob.sync('graphql/*/*Resolver.js')
let registerResolvers = []
for (const resolver of resolvers) {
    registerResolvers = [...registerResolvers, require('./' + resolver)]

}

let types = glob.sync('graphql/*/*Type.js')
let registerTypes = []
for (const type of types) {
    registerTypes = [...registerTypes, require('./' + type)]
}

const schema = makeExecutableSchema({ typeDefs: mergeTypeDefs(registerTypes), resolvers: mergeResolvers(registerResolvers) })

// Route for graphql
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))

sequelize
    .sync() //sync db tables
    .then(() => {
        // Server Listen  
        app.listen(4000, () => console.log('Listening on port 4000'))
    });
