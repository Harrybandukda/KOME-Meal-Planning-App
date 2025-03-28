const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    author: {
        type: DataTypes.STRING,
        allowNull: true
    },

    link: {
        type: DataTypes.STRING,
        allowNull: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cookware: {
        type: DataTypes.STRING,
        allowNull: true,
        get () {
            const value = this.getDataValue('cookware');
            return (value) ? value.split(';') : [];
        },
        set(value) {
            if (Array.isArray(value)) {
                value = value.join(';');
            }
            this.setDataValue('cookware', value);
        }
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 100
    },
    carbs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 3
    },
    fat: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 2
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 10
    },

})}