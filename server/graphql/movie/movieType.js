const gql = require('graphql-tag')

const movieType = gql`
    type MovieType {
        id: ID
        title: String
        stock: Int
        rate: Int
        genreId: ID
        genre: GenreType
    }
    input MovieInput {
        id: ID
        title: String
        stock: Int
        rate: Int
        genreId: ID
    }
    type Query {
        movies: [MovieType]
        movie(id: ID): MovieType
        searchMovies(title: String): [MovieType] 
    }
    type Mutation {
        addMovie(input: MovieType): MovieType
        editMovie(input: MovieType): MovieType
        deleteMovie(id: ID): MovieType
    }
`

module.exports = movieType