const { genre } = require('../../helpers/dbHelper')

const  genreResolver =  {

     Query: {
        genres: async () => {
            return await genre.findAll();
        }
    }

};
module.exports = genreResolver