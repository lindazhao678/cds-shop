const gql = require('graphql-tag')

const movieType = gql`
    type MovieType {
        id: ID
        title: String
        stock: Int
        genreId: ID
        rate: Int
        year: Int
        genre: GenreType
    }
    input MovieInput {
        id: ID
        title: String
        stock: Int
        genreId: ID
        rate: Int
        year: Int
    }
    type Query {
        movies: [MovieType]
        movie(id: ID): MovieType
        searchMovies(title: String): [MovieType] 
    }
    type Mutation {
        addMovie(input: MovieInput): MovieType
        editMovie(input: MovieInput): MovieType
        deleteMovie(id: ID): MovieType
    }
`

module.exports = movieType