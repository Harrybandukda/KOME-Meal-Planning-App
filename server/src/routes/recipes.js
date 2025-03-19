const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeController.getRecipes();

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await recipeController.getRecipe(id);

        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const recipes = await recipeController.getUserRecipes(userId);

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/addToUser/:userId', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const userId = req.params.userId;

        await recipeController.addRecipeToUser(userId, recipeId);

        res.status(200).json({ message: "Recipe added to user." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create recipe 
router.post('/', async (req, res) => {
    try {
        const { user, name, description, instructions, ingredients, categories } = req.body

        const recipe = await recipeController.createRecipe(user, name, description, instructions, ingredients, categories)

        res.status(201).send(recipe)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;