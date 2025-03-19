const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('MealHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: { 
        type: DataTypes.DATE,
        default: DataTypes.NOW
    }
});
}