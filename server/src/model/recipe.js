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
            this.setDataValue('cookware', value.join(';'));
        }
    }

})}