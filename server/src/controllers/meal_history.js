const { models } = require('../database');

const mhController = {
    getMealHistory: async (userId) => {
        try {
            // Find user & users meal history 
            const user = await models.User.findAll({ 
                where: { id: userId },
                include: { model: MealHistory }
            })

            // If no user or meal history 
            if(!user){
                return "User not found"
            } else if(!user.MealHistories){
                return "No meal history"
            }

            return user.MealHistories
        } catch (err) {
            console.log("Error getting meal history:", err.message)
            throw new Error("Error getting meal history:", err.message)
        }
    },
    addMealHistory: async (userId, recipe) => {
        try {
            await models.MealHistories.create({ userId: userId, recipeId: recipe.id })
            console.log(`Added ${recipe.name} to users meal history.`);
        } catch (err) {
            console.log("Error adding recipe to history:", err.message)
            throw new Error("Error adding recipe to history:", err.message)
        }
    },
    deleteMealHistory: async (userId, recipe) => {
        try {
            await models.MealHistory.destroy({
                where: {
                    userId: userId,
                    recipeId: recipe.id
                }
            })
            console.log(`Deleted ${recipe.name} from users meal history.`);
        } catch (err) {
            console.log("Error deleting history:", err.message)
            throw new Error("Error deleting history:", err.message)
        }
    },
}

module.exports = mhController