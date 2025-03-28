const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Ingredient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    unit: {
        type: DataTypes.STRING,
        allowNull: false
    }
})}