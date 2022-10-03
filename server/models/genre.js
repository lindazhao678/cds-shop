const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Genre = sequelize.define('genre', {
        genre: { type: DataTypes.STRING }
    });
    return Genre
}