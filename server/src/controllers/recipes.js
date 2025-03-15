const { models } = require('../database');

const recipeController = {
    getRecipes: async () => {
        return await models.Recipe.findAll();
    },
    getRecipe: async (id) => {
        console.log("ADASDASDAD");
        console.log(id);
        return await models.Recipe.findByPk(id);
    },
    getUserRecipes: async (userId) => {
        const user = await models.User.findOne({
            where: { id: userId },
            include: models.Recipe
        });
        return user.Recipes;
    },
    addRecipeToUser: async (userId, recipeId) => {
        const user = await models.User.findByPk(userId);
        const recipe = await models.Recipe.findByPk(recipeId);
        return await user.addRecipe(recipe);
    },
    createRecipe: async (name, description, instructions, ingredients, categories) => { // Create Recipe 
        try {
            // no duplicate name 
            // API call to check the other db we're using? 
            const dupName = await models.Recipe.findOne({ where: { name: name }})
            if(name){
                throw Error("Name already in use")
            }

            // create link for recipe 
            
            // find ingredients
            // API call to check other db we're using?

            // find categories & save 
            // find restrictions 

            // Save to Recipe db 
            const recipe = await models.Recipe.create({name, description, instructions});

            return recipe; 
        } catch (err) {
            console.log("Error creating recipe:", err.message)
            throw new Error("Error creating recipe:", err.message)
        }
    }
};

module.exports = recipeController;