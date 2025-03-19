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
    createRecipe: async (user, name, description, instructions, ingredients, categories) => { // Create Recipe 
        try {
            // no duplicate name 
            const dupName = await models.Recipe.findOne({ where: { name: name }})
            if(dupName){
                throw Error("Name already in use")
            }

            // create link for recipe 
            const link = `https://kome.my/${name.replace(/ /g, '-')}`
            
            // Save to Recipe db 
            const recipe = await models.Recipe.create({
                name: name,
                author: user.full_name,
                link: link,
                description: description,
                instructions: instructions, 
            });

            // Add Ingredients relationship
            await models.Recipe.addIngredients(ingredients)

            // Add Categories 
            await models.Recipe.addCategories(categories)

            // Add to user
            await models.User.addRecipe(recipe)

            console.log("Recipe created")
            return recipe; 
        } catch (err) {
            console.log("Error creating recipe:", err.message)
            throw new Error("Error creating recipe:", err.message)
        }
    }
};

module.exports = recipeController;