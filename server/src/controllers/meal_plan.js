const { models } = require('../database');

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const mealPlanController = {
    getAllPlans: async () => {
        try {
            return await models.MealPlan.findAll();
        } catch (err) {
            console.log("Error getting meal plans: ", err.message)
            throw new Error("Error getting meal plans: ", err.message)
        }
    },
    getDailyPlan: async (id) => {        
        try {
            return await models.MealPlan.findByPk(id)
        } catch (err) {
            console.log("Error getting meal plan: ", err.message)
            throw new Error("Error getting meal plan: ", err.message)
        }
    },
    generateMealPlan: async (userId) => {
        try {
            // get all allergies 
            const user = await models.User.findByPk(userId);

            if (!user) {
                throw Error("Requires a valid user");
            }

            const validRecipes = await models.Recipe.findAll();
        
            // verify allergy doesn't already exist 
            if(validRecipes.length < 1){
                throw Error("Could not find suitable recipes")
            }

            const mealPlan = await models.MealPlan.create({ userId: userId });

            // random recipes are picked right now
            mealPlan.breakfast = getRandomElement(validRecipes).id;
            mealPlan.lunch = getRandomElement(validRecipes).id;
            mealPlan.dinner = getRandomElement(validRecipes).id;

            // save meal plan
            await mealPlan.save();
        } catch (err) {
            console.log("Error while generating meal plan: ", err.message)
            throw new Error("Error while generating meal plan: ", err.message)
        }
    },
}

module.exports = mealPlanController