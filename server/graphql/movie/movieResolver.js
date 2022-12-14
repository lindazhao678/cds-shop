const { movieModel, genreModel } = require('../../helpers/dbHelper')

const movieResolver = {

    MovieType: {
        genre: async (parent, args) => {
            return await genreModel.findByPk(parent.genreId)
        }
    },
    Query: {
        movies: async () => {
            return await movieModel.findAll()
        },
        movie: async (parent, args) => {
            return await movieModel.findByPk(args.id)
        },
        searchMovies: async (parent, args) => {
            return await movieModel.findAll(
                {
                    where: { title: args.title }
                }
            )
        }
    },
    Mutation: {
        addMovie: async (parent, args) => {
            let movie = new movieModel(args.input)
            return await movie.save()
        },
        deleteMovie: async (parent, args) => {
            const movie = await movieModel.findByPk(args.id)
            if (movie) {
                await movieModel.destroy({
                    where: {
                        id: args.id
                    }
                })
                return movie
            }
            return null
        },
        editMovie: async (parent, args) => {
            const input = args.input;
            const movie = await movieModel.findByPk(input.id)
            if (movie) {
                await movieModel.update(
                    {
                        title: input.title,
                        stock: input.stock,
                        genreId: input.genreId,
                        rate: input.rate,
                        yaer: input.year

                    },
                    {
                        where: { id: input.id }
                    }
                )
                return movie
            }
            return null
        }
    }
}

module.exports = movieResolver