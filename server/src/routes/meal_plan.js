const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/meal_plan');
const sessionController = require('../controllers/session');

// Get all plans 
router.get('/', async (req, res) => {
    try {
        const plans = await mealPlanController.getAllPlans();

        res.status(200).send(plans);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const plan = await mealPlanController.getDailyPlan(req.params.id);
        res.status(200).send(plan)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get all plans for specific user
router.get('/user/:id', async (req, res) => {
    try {
        const plans = await mealPlanController.getUserPlans(req.params.id);
        res.status(200).send(plans);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/create', async (req, res) => {
    try {
        const { userId, weekday } = req.body;

        await sessionController.rejectIfNotAuthorized(req, userId);

        const plan = await mealPlanController.generateMealPlan(userId, weekday);

        res.status(201).send(plan);
    } catch(err) {
        if (err.message === "Unauthorized") {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }

    }
})

module.exports = router