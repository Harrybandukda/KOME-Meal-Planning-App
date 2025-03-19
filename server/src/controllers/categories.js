const { models } = require('../database');

const categoriesController = {
    getCategories: async () => {
        try {
            return await models.Categories.findAll()
        } catch (err) {
            console.log("Error getting categories:", err.message)
            throw new Error("Error getting categories:", err.message)
        }
    },
    getCategoryById: async (id) => {
        try {
            return await models.Categories.findByPk(id)
        } catch (err) {
            console.log("Error getting categories:", err.message)
            throw new Error("Error getting categories:", err.message)
        }
    }
}

module.exports = categoriesController