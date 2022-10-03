const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Movie = sequelize.define('movie', {
        title: { type: DataTypes.STRING },
        rate: { type: DataTypes.INTEGER },
        stock: { type: DataTypes.INTEGER },
    });

    return Movie
};