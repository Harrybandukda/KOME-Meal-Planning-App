const { models } = require('../database');
const { Op } = require('sequelize');

const restrictionsController = {
    getRestrictions: async () => {
        try {
            return await models.DietaryRestrictions.findAll()
        } catch (err) {
            console.log("Error getting dietary restrictions:", err.message)
            throw new Error("Error getting dietary restrictions:", err.message)
        }
    },
    getRestriction: async (id) => {
        try {        
            return await models.DietaryRestrictions.findByPk(id)
        } catch (err) {
            console.log("Error getting dietary restriction:", err.message)
            throw new Error("Error getting dietary restriction:", err.message)
        }
    },
    addRestriction: async (name) => {
        try {
            // get all restrictions 
            const restrictions = await models.DietaryRestrictions.findAll()
        
            // verify allergy doesn't already exist 
            if(restrictions.includes(name)){
                throw Error("Dietary restriction already exists")
            }

            // save allergy 
            const dietRes = await models.DietaryRestrictions.create({ name: name })

            // Find if name the same as any category (case insensitive)
            const categories = await models.Categories.findAll({ name: { [Op.iLike]: `%${name}%` }})
            // Add to relationship
            if(categories.length > 0){
                categories.forEach(async cat => {
                    await models.DietaryRestrictions.addCategory(cat)
                })
            }

            console.log(`Dietary Restriction ${name} created.`)
        } catch (err) {
            console.log("Error adding dietary restrictions:", err.message)
            throw new Error("Error adding dietary restrictions:", err.message)
        }
    },
    updateDietaryRestrictions: async (userId, restrictions) => {
        try {
            // Get user 
            const user = await models.User.findByPk(userId)
            if (!user) {
                throw Error("User not found")
            }

            // Removed previous allergies & adds provided ones 
            if(restrictions != null){
                await user.setDietaryRestrictions(restrictions)
            } else {
                throw Error("Dietary Restrictions not provided.")
            }

            console.log(`Added dietary restrictions to ${user.username}: ${restrictions.name.join(", ")}`);
        }  catch (err) {
            console.log("Error updating dietary restrictions:", err.message)
            throw new Error("Error updating dietary restrictions:", err.message)
        }
    },

}

module.exports = restrictionsController