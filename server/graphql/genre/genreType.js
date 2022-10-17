const gql = require('graphql-tag')

const genreType = gql`
    type GenreType {
        id: ID
        name: String
    }
    input GenreInput {
        id: ID
        name: String
    }
    type Query {
        genres: [GenreType]
        genre(id: ID): GenreType
    }
`

module.exports = genreType