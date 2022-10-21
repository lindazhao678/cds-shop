module.exports = (sequelize, DataTypes) => {

    const Movie = sequelize.define('movie', {
        title: { type: DataTypes.STRING, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        // Do not add the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    }
    );
    return Movie
};