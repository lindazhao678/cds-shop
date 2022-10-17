

module.exports = (sequelize, DataTypes) => {
    
    const Genre = sequelize.define('genre', {
        name: { type: DataTypes.STRING, allowNull: false },
        // Do not add the timestamp attributes (updatedAt, createdAt)
    },
    {
        timestamps: false
    }
    );
    return Genre
}