import { gql } from "@apollo/client";

export const ALL_GENRES = gql`
query {
	genres {
		id
		name
	}
}
`