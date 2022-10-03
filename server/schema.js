const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Query {
        movie: Movie
    }

    type Movie {
        id: ID
        title: String
        genre: String
        stock: Int
        rating: Int    
    }
`)

module.exports = schema