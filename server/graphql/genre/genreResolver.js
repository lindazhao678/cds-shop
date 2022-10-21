const { genreModel } = require('../../helpers/dbHelper')

const genreResolver = {

    Query: {
        genres: async () => {
            return await genreModel.findAll()
        },
        genre: async (parent, args) => {
            return await genreModel.findByPk(args.id)
        }
    },
    Mutation: {
        addGenre: async (parent, args) => {
            let genre = new genreModel(args.input)
            return await genre.save()
        },
        deleteGenre: async (parent, args) => {
            const genre = await genreModel.findByPk(args.id)
            if (genre) {
                await genreModel.destroy({
                    where: {
                        id: args.id
                    }
                })
                return genre
            }
            return null
        },
        editGenre: async (parent, args) => {
            const input = args.input;
            const genre = await genreModel.findByPk(input.id)
            if (genre) {
                await genreModel.update(
                    {
                        name: input.name
                    },
                    {
                        where: { id: input.id }
                    }
                )
                return genre
            }
            return null
        }
    }
}
module.exports = genreResolver