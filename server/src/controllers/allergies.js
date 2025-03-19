const { models } = require('../database');

const allergiesController = {
    getAllergies: async () => {
        try {
            return await models.Allergies.findAll()
        } catch (err) {
            console.log("Error getting allergies:", err.message)
            throw new Error("Error getting allergies:", err.message)
        }
    },
    getAllergy: async (id) => {        
        try {
            return await models.Allergies.findByPk(id)
        } catch (err) {
            console.log("Error getting allergy:", err.message)
            throw new Error("Error getting allergy:", err.message)
        }
    },
    addAllergy: async (name) => {
        try {
            // get all allergies 
            const allergies = models.Allergies.findAll()
        
            // verify allergy doesn't already exist 
            if((await allergies).includes(name)){
                throw Error("Allergy already exists")
            }

            // save allergy 
            await models.Allergies.create({ name: name })

            // Add ingredient relationship
            const ingredients = await models.Ingredients.findAll({ name: name })
            // Add relationship
            if(ingredients.length > 0){
                ingredients.forEach(async ing => {
                    await models.Allergies.addIngredient(ing)
                })
            }

            console.log(`Allergy ${name} created`)
        } catch (err) {
            console.log("Error adding allergies:", err.message)
            throw new Error("Error adding allergies:", err.message)
        }
    },
    updateAllergies: async (userId, allergies) => {
        try {
            // Get user 
            const user = await models.User.findByPk(userId)
            if (!user) {
                throw Error("User not found")
            }

            // Removed previous allergies & adds provided ones 
            await user.setAllergies(allergies)

            console.log(`Added allergies to ${user.username}: ${allergies.name.join(", ")}`);
        } catch (err) {
            console.log("Error updating allergies:", err.message)
            throw new Error("Error updating allergies:", err.message)
        }
    },
}

module.exports = allergiesController