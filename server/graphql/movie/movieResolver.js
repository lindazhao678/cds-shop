const { movie, genre } = require('../../helpers/dbHelper')

const  movieResolver =  {
    MovieType: {
		genre: (parent, args) => {
			return genre.findByPk(parent.genreId);
		}
	},
     Query: {
        movies: async () => {
            return await movie.findAll();
        },
        movie: async (parent, args) => {
            return await movie.findByPk(args.id);
        }
    }

};
module.exports = movieResolver