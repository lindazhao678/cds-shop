// const mysql = require('mysql');

// //Create Pool
// const pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'movieshop',
//     password: 'MySQL123!',
//     database: 'movieshop',
//     insecureAuth: true,
//     port: 3306
// })

// function connectMySQL() {
//     console.log("connectMySQL")
//     return pool;
// }

// module.exports = { connectMySQL }

const Sequelize = require('sequelize');

// The first arguments are the database name, username, password, JSON holding setting the dialect and location to store the database
const sequelize = new Sequelize('movieshop', 'movieshop', 'MySQL123!', { dialect: 'mysql', host: 'localhost' })
const movieModel = require("../models/movie")(sequelize, Sequelize.DataTypes);
const genreModel = require("../models/genre")(sequelize, Sequelize.DataTypes);
// Define one to many relationship between genre and movie
genreModel.hasMany(movieModel);

module.exports = { sequelize, movieModel, genreModel }