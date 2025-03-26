const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        email: DataTypes.STRING,
        full_name: DataTypes.STRING,
        password: DataTypes.STRING,
        weight: DataTypes.FLOAT,
        gender: DataTypes.STRING,
        goal: DataTypes.STRING,
    }, {
        defaultScope: {
          attributes: {
            exclude: ['password']
          }
        },
        scopes: {
          withPassword: {
            attributes: {}
          }
        }
    });
};
