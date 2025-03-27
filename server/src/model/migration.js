const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Migration', {
        version: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
)};