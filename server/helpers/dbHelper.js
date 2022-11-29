const Sequelize = require('sequelize');

// The arguments are the database name, username, password, JSON holding setting the dialect and location to store the database
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, { dialect: `${process.env.DIALECT}`, host: `${process.env.HOST}`})
const movieModel = require("../models/movie")(sequelize, Sequelize.DataTypes);
const genreModel = require("../models/genre")(sequelize, Sequelize.DataTypes);
// Define one to many relationship between genre and movie
genreModel.hasMany(movieModel);

module.exports = { sequelize, movieModel, genreModel }