import { gql } from "@apollo/client";

export const ALL_MOVIES = gql`
query {
  movies {
	id
	title
	stock
    genreId
	rate
	year
	genre{
		id
        name
    }
  }
}
`;

export const SINGLE_MOVIE = gql`
query Movie($id: ID) {
  movie(id: $id) {
	id
	title
    stock
    genreId
	rate
	year
	genre{
		id
        name
    }
  }
}
`;

export const SEARCH_MOVIES = gql`
query SearchMovies($title: String) {
	searchMovies(title: $title) {
        id
        title
        stock
        genreId
		rate
		year
        genre{
			id
            name
        }
    }
}
`;

export const ADD_MOVIE = gql`
mutation AddMovie($title: String, $stock: Int, $genreId: ID, $rate: Int, $year: Int) {
  addMovie(input: { 
	title: $title
	stock: $stock
	genreId: $genreId
	rate: $rate
	year: $year 
	}) {
		id
		title
		stock
		genreId
		rate
		year
		genre{
			id
			name
		}
  	}
}
`;

export const DELETE_MOVIE = gql`
mutation DeleteMovie($id: ID) {
  deleteMovie(id: $id) {
	id
	title
	stock
	genreId
	rate
	year
	genre {
		id
		name
	}
  }
}
`;

export const EDIT_MOVIE = gql`
mutation EditMovie($id: ID, $title: String, $stock: Int, $genreId: ID, $rate: Int, $year: Int){
	editMovie(input: {
	id: $id
	title: $title
	stock: $stock
	genreId: $genreId
	rate: $rate, 
	year: $year
	}) {
		id
		title
		stock
		genreId
		rate
		year
		genre {
			id
			name
		}
	}
}
`



