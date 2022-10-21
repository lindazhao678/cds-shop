const Sequelize = require('sequelize');

// The arguments are the database name, username, password, JSON holding setting the dialect and location to store the database
const sequelize = new Sequelize('movieshop', 'movieshop', 'MySQL123!', { dialect: 'mysql', host: 'localhost' })
const movieModel = require("../models/movie")(sequelize, Sequelize.DataTypes);
const genreModel = require("../models/genre")(sequelize, Sequelize.DataTypes);
// Define one to many relationship between genre and movie
genreModel.hasMany(movieModel);

module.exports = { sequelize, movieModel, genreModel }