const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const questionRoutes = require('./routes/questionnaire');
const allergiesRoutes = require('./routes/allergies');
const dietaryRestrictionsRoutes = require('./routes/dietary_restrictions');
const mealHistoryRoutes = require('./routes/meal_history');
const mealPlanRoutes = require('./routes/meal_plan');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("COMP 3078 Capstone Project"));

app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/allergies', allergiesRoutes);
app.use('/api/dietary_restrictions', dietaryRestrictionsRoutes);
app.use('/api/meal_history', mealHistoryRoutes);
app.use('/api/meal_plan', mealPlanRoutes);

module.exports = app;
