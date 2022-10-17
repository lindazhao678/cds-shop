const { movieModel, genreModel } = require('../../helpers/dbHelper');
const movie = require('../../models/movie');

const movieResolver = {

    MovieType: {
        genre: async (parent, args) => {
            return await genreModel.findByPk(parent.genreId);
        }
    },
    Query: {
        movies: async () => {
            return await movieModel.findAll();
        },
        movie: async (parent, args) => {
            return await movieModel.findByPk(args.id);
        },
        searchMovies: async (parent, args) => {
            return await movieModel.find({ name: new RegExp('^' + args.name + '$', 'i') })
        }
    },
    Mutation: {
        addMovie: async (parent, args) => {
            let movie = new movieModel(args.input)
            return await movie.save()
        },
        deleteMovie: async (parent, args) => {
            const movie = await movieModel.findByPk(args.id)
            if(movie){
                return await movieModel.destroy({
                    where: {
                        id: args.id
                    }
                })
            }
            return null;
        },
        editMovie: async (parent, args) => {
            const input = args.input;
            await movieModel.update(
                {
                    title: input.title,
                    stock: input.stock,
                    rate: input.rate,
                    genreId: input.genreId
                },
                {
                    where: { id: input.id }
                }
            );
            return await movieModel.findByPk(input.id);
            
        }
    }
};

module.exports = movieResolver