const { Sequelize } = require('sequelize');
const populateDatabase = require('./populate')
const sequelize = new Sequelize(process.env.DATABASE_URL);

const models = [
    require("./model/allergies"),
    require("./model/categories"),
    require("./model/dietary_restrictions"),
    require("./model/ingredient"),
    require("./model/meal_history"),
    require("./model/meal_plan"),
    require("./model/migration"),
    require("./model/questionnaire"),
    require("./model/recipe"),
    require("./model/session"),
    require('./model/user'),
];

for (const model of models) {
    model(sequelize);
}

const { Allergies, Categories, DietaryRestrictions, Ingredient, MealHistory, MealPlan, Questionnaire, Recipe, Session, User } = sequelize.models;

Allergies.hasMany(Ingredient);
Ingredient.belongsTo(Allergies);

DietaryRestrictions.hasMany(Categories)
Categories.belongsTo(DietaryRestrictions)

Questionnaire.belongsToMany(Categories, { through: 'QuestionCategory' });
Categories.belongsToMany(Questionnaire, { through: 'QuestionCategory' });

Recipe.belongsToMany(Categories, { through: 'RecipeCategories' });
Categories.belongsToMany(Recipe, { through: 'RecipeCategories' });

Recipe.belongsToMany(Ingredient, { through: 'RecipeIngredients' });
Ingredient.belongsToMany(Recipe, { through: 'RecipeIngredients' });

User.belongsToMany(Recipe, { through: 'UserRecipes' });
Recipe.belongsToMany(User, { through: 'UserRecipes' });

User.belongsToMany(Allergies, { through: 'UserAllergies' });
Allergies.belongsToMany(User, { through: 'UserAllergies' });

User.belongsToMany(DietaryRestrictions, { through: 'UserDietaryRestrictions' });
DietaryRestrictions.belongsToMany(User, { through: 'UserDietaryRestrictions' });

User.hasMany(MealHistory);
MealHistory.belongsTo(User);

Recipe.hasMany(MealHistory);
MealHistory.belongsTo(Recipe);

User.hasMany(MealPlan);
MealPlan.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

Recipe.hasMany(MealPlan, { foreignKey: 'breakfast'});
Recipe.hasMany(MealPlan, { foreignKey: 'lunch' });
Recipe.hasMany(MealPlan, { foreignKey: 'dinner' });

sequelize.sync()
    .then(async () => { 
        console.log('All models were synchronized successfully.')
        await populateDatabase(sequelize.models)
        console.log("Database populated")
    })
    .catch(err => console.log(err));

module.exports = sequelize;