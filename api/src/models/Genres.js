const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genres', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
}