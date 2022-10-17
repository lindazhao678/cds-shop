const { genreModel } = require('../../helpers/dbHelper')

const  genreResolver =  {

     Query: {
        genres: async () => {
            return await genreModel.findAll();
        }
    }
};
module.exports = genreResolver