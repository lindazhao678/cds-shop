const gql = require('graphql-tag')

const genreType = gql`
    type GenreType {
        id: ID
        genre: String
    }
    input GenreInput {
        id: ID
        genre: String
    }
    type Query {
        genres: [GenreType]
        genre(id: ID): GenreType
    }
`

module.exports = genreType