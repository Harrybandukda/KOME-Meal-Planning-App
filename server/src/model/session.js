const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Session', {
        identifier: { 
            type: DataTypes.STRING,
            primaryKey: true
        },
    });
};
