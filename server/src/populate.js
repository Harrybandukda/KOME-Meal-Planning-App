const DATABASE_VERSION = 1;

async function populateDatabase(models) {
    try {
        const lastMigration = await models.Migration.findByPk(1);
        if (lastMigration) {
            if ( lastMigration.version >= DATABASE_VERSION) {
                console.log("Database already populated; skipping");
                return;
            } else {
                lastMigration.version = DATABASE_VERSION;
                console.log("Updating database to version ", DATABASE_VERSION);
                await lastMigration.save();
            }
        } else {
            await models.Migration.create({ version: DATABASE_VERSION });
            console.log("Migration created");
        }

        // Populate Categories
        const categories = await models.Categories.bulkCreate([
            { name: "African" },
            { name: "American" },
            { name: "Appetizer" },
            { name: "Baked" },
            { name: "Beverage" },
            { name: "Bread" },
            { name: "Breakfast" },
            { name: "Caribbean" },
            { name: "Chinese" },
            { name: "Cold" },
            { name: "Creamy" },
            { name: "Crispy" },
            { name: "Crunchy" },
            { name: "Dairy-Free" },
            { name: "Desert" },
            { name: "Deep Fried" },
            { name: "Dinner" },
            { name: "Dry" },
            { name: "French" },
            { name: "Fried" },
            { name: "Gluten-Free" },
            { name: "Greek" },
            { name: "High Carb" },
            { name: "High Fiber" },
            { name: "High Protein" },
            { name: "Hot" },
            { name: "Indian" },
            { name: "Italian" },
            { name: "Japanese" },
            { name: "Keto" },
            { name: "Korean" },
            { name: "Low Carb" },
            { name: "Low Sugar" },
            { name: "Lunch" },
            { name: "Mediterranean" },
            { name: "Mexican" },
            { name: "Middle Eastern" },
            { name: "Salad" },
            { name: "Salty" },
            { name: "Sauce" },
            { name: "Soup" },
            { name: "Smoked" },
            { name: "Snack" },
            { name: "Spicy" },
            { name: "Sweet" },
            { name: "Thai" },
            { name: "Vegan" },
            { name: "Vegetarian" },
            { name: "Vietnamese" },
            { name: "Quick" }
        ], { ignoreDuplicates: false });

        // Populate Dietary Restrictions 
        const dietRest = await models.DietaryRestrictions.bulkCreate([
            { name: "Gluten-Free" },
            { name: "Vegan" },
            { name: "Vegetarian" },
            { name: "Pescetarian" },
            { name: "Dairy-Free" },
            { name: "Halal" },
            { name: "Kosher" },
            { name: "Raw Food" },
            { name: "Keto" },
            { name: "Paleo" },
            { name: "Low-Carb" }
        ], { ignoreDuplicates: false });

        // Populate Allergies
        const allergies = await models.Allergies.bulkCreate([
            { name: "Eggs" },
            { name: "Dairy" },
            { name: "Wheat" },
            { name: "Tree Nuts" },
            { name: "Peanuts" },
            { name: "Soy" },
            { name: "Shellfish" },
            { name: "Sesame" },
            { name: "Fish" }
        ]);

        // Populate Questions
        const questions = await models.Questionnaire.bulkCreate([
            { question: "What temperature are looking to consume?" },
            { question: "Dry or Crispy" },
            { question: "Heavy or Light" },
            { question: "Spicy or Sweet" },
            { question: "What cuisine sounds most appealing?" },
            { question: "Sweet, salty or both?" },
            { question: "What time-of-day meal do you want?" },
            { question: "Fried or Baked?" },
            { question: "Quick cook time?" },
            { question: "Soup or Salad?" },
            { question: "Crunchy or Creamy?" },
            { question: "Want something high in Fiber or Protein?" }
        ]);

        // Populate QuestionCategory 
        await models.QuestionCategory.bulkCreate([
            { QuestionnaireId: questions[0].id, CategoryId: categories[9].id },
            { QuestionnaireId: questions[0].id, CategoryId: categories[25].id },
            { QuestionnaireId: questions[1].id, CategoryId: categories[16].id },
            { QuestionnaireId: questions[1].id, CategoryId: categories[11].id },
            { QuestionnaireId: questions[2].id, CategoryId: categories[24].id },
            { QuestionnaireId: questions[2].id, CategoryId: categories[42].id },
            { QuestionnaireId: questions[3].id, CategoryId: categories[43].id },
            { QuestionnaireId: questions[3].id, CategoryId: categories[44].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[35].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[45].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[27].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[8].id },
            { QuestionnaireId: questions[5].id, CategoryId: categories[44].id },
            { QuestionnaireId: questions[5].id, CategoryId: categories[38].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[6].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[16].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[33].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[14].id },
            { QuestionnaireId: questions[7].id, CategoryId: categories[19].id },
            { QuestionnaireId: questions[7].id, CategoryId: categories[3].id },
            { QuestionnaireId: questions[8].id, CategoryId: categories[49].id },
            { QuestionnaireId: questions[9].id, CategoryId: categories[37].id },
            { QuestionnaireId: questions[9].id, CategoryId: categories[40].id },
            { QuestionnaireId: questions[10].id, CategoryId: categories[10].id },
            { QuestionnaireId: questions[10].id, CategoryId: categories[12].id },
            { QuestionnaireId: questions[11].id, CategoryId: categories[22].id },
            { QuestionnaireId: questions[11].id, CategoryId: categories[23].id }
        ]);

        const recipes = await models.Recipe.bulkCreate([
            {
                name: "Gluten Free Turkey Meatballs",
                author: "Kristi",
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2021/03/Gluten-Free-Turkey-Meatballs-2.jpg",
                description: "These gluten free turkey meatballs are so quick and easy to make using a pressure cooker that you’ll want them in your regular dinner rotation. Plus they’re dairy, egg, soy, and gluten free!",
                instructions: "Start by combining all of the ingredients in a small saucepan and cook over medium heat until it bubbles. Turn down the heat to low and simmer for 5 minutes. Add barbecue sauce."
            },
            {
                name: "Vegan Black Bean Soup",
                author: "Ali",
                link: "https://www.gimmesomeoven.com/wp-content/uploads/2024/12/Quick-Black-Bean-Soup-12.jpg",
                description: "This quick black bean soup recipe is full of flavor and protein and comes together in less than 30 minutes!",
                instructions: "Heat the oil in a large stockpot over medium-high heat. Add the onion, carrot, bell pepper and sauté for 6 minutes. Add in the garlic, cumin, chili powder and chipotle powder and sauté. Add the vegetable broth and black beans and stir to combine."
            },
            {
                name: "Cream of Mushroom Soup",
                author: "Kristi",
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/08/Cream-of-mushroom-soup-2-1024x1024.png",
                description: "This cream of mushroom soup is a versatile dish that can be eaten by the bowl or kept thicker to use in casseroles.",
                instructions: "Heat beef stock and 4 cups of rice milk in a large soup pot and bring to a boil. Add crushed rice noodles and salt. Add stirred mushroom. When soup is thick, using a hand held immersion blender, puree the soup until smooth. Add rice milk. "
            },
            {
                name: "Quinoa and Rice With Sweet Potatoes",
                author: "Kristi",
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/08/Quinoa-and-rice-with-sweet-potatoes-2.png",
                description: "Hearty and nutritious quinoa and rice with sweet potatoes is a satisfying dish that can be a side dish or a meal on its own and it's free of the top 8 allergens.",
                instructions: "Chopped vegetables saute in extra virgin olive oil over medium heat. When your veggies are done cooking and you've rinsed the quinoa, you can combine all ingredients in a casserole dish and bake 30 minutes at 400 F."
            },
            {
                name: "Dairy Free Chicken Pot Pie {Allergy Friendly}",
                author: "Kristi",
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/10/Chicken-pot-pie-2.jpg",
                description: "A hearty, creamy chicken stew is topped with pie crust rounds to create single servings of gluten and dairy free chicken pot pie. It's a spin on the traditional dish but is free from other common allergens so everyone can enjoy it!",
                instructions: "Stir in the broth and dairy free milk. Add fried chicken breast with stirred vegetables. Cook and stir until the mixture is thickened. Serve topped with a pie crust round from gluten-free flour."
            },
            {
                name: "Gluten-Free Chili {Allergy Friendly}", 
                author: "Kristi",
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2023/03/Gluten-free-chili-featured.jpg",
                description: "This gluten-free chili is a delicious and healthy dish that is so easy to make on the stovetop, Instant Pot, or slow cooker. It's free from common allergens like wheat, dairy, and soy so it can be enjoyed by everyone",
                instructions: "Saute the meat, onion, and celery. Once the meat is browned and the onion and celery are tender, add the garlic and seasonings and cook for another minute. Then, turn off heat and add the other ingredients."
            },
            {
                name: "Gluten and Dairy Free Mexican Lasagna", 
                author: "Kristi",
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/07/Untitled-design-34-1024x1024.png",
                description: "Looking for an easy dinner that your whole family will love and is free of the top 8 allergens? Try this gluten and dairy free Mexican lasagna! It's on my regular weeknight meal rotation because it's simple to make and my family loves it!",
                instructions: "Brown the ground turkey in a skillet until no longer pink. Add the onion and cook until translucent. Add the taco seasoning and water. Stir in the beans, salsa, and corn and cook over medium heat until bubbling."
            },
        ]);

        // Populate ingredients 
        const ingredients = await models.Ingredient.bulkCreate([
            { name: "Glutten Free Bread Crumbs" },
            { name: "Dairy Free Milk" },
            { name: "Ground Beef" },
            { name: "Ground Pork" },
            { name: "Brown Sugar" },
            { name: "Ground Pepper" },
            { name: "Salt" }, // id 6
            { name: "Nutmeg" },
            { name: "Onion Powder" },
            { name: "Garlic Powder" },
            { name: "Allspice" }, // id 10
            { name: "Black Beans" },
            { name: "Tomatoes" },
            { name: "Yellow Onions" },
            { name: "Carrots" }, // 14
            { name: "Red Bell Pepper" },
            { name: "Garlic" },            
            { name: "Ground Cumin" },            
            { name: "Chili Powder" },            
            { name: "Chipotle Powder" },            
            { name: "Veggetable Broth" },            
            { name: "Lime" },            
            { name: "Cilantro" },            
            { name: "Cheddar Cheese" },            
            { name: "Avacado" },            
            { name: "Red Onion" }, // id 25     
            { name: "Mushrooms" },            
            { name: "Beef Stock" },            
            { name: "Rice Milk" },            
            { name: "Rice Noodles" },            
            { name: "Canola Oil" },            
            { name: "Shallots" },            
            { name: "Button Mushrooms" },            
            { name: "Dry Sherry" }, // id 33
            { name: "Extra Virgin Olive Oil" },            
            { name: "Celery" },            
            { name: "Sweet Potato" },            
            { name: "Brown Rice" },            
            { name: "Quinoa" },            
            { name: "Chicken Broth" },            
            { name: "Dried Thyme Leaves" }, 
            { name: "Cooking Spray" }, // 41            
            { name: "Chicken Breast" },            
            { name: "Glutten Free All Purpose Flower" },                   
            { name: "Rubbed Sage" },            
            { name: "Glutten Free Chicken Stock" },                
            { name: "Frozen Mixed Vegetables" },            
            { name: "Sugar" },                
            { name: "Dairy Free Margarine" },            
            { name: "Shortening" },                
            { name: "Vinegar" }, // 50 
            { name: "Lean Ground Beef" },                
            { name: "Dried Oregano" },            
            { name: "Marinara Sauce" },                
            { name: "Diced Tomatoes and Green Chilis" },            
            { name: "Dark Red Kidney Beans" },                
            { name: "Gluten Free Beef Broth" },            
            { name: "Bay Leaves" }, // 57
            { name: "Ground Turkey" },         
            { name: "Gluten Free Taco Seasoning" },
            { name: "Tomato Salsa" },
            { name: "Froxen Corn" },
            { name: "Corn Tortillas" },
            { name: "Dairy Free Cheese" }, // 63
        ]);

        // Populate RecipeIngredients
        await models.RecipeIngredients.bulkCreate([
            { RecipeId: recipes[0].id, IngredientId: ingredients[0].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[1].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[2].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[3].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[4].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[5].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[6].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[7].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[8].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[9].id },
            { RecipeId: recipes[0].id, IngredientId: ingredients[10].id },

            { RecipeId: recipes[1].id, IngredientId: ingredients[11].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[12].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[13].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[14].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[15].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[16].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[17].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[18].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[19].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[20].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[21].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[22].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[23].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[24].id },
            { RecipeId: recipes[1].id, IngredientId: ingredients[25].id },

            { RecipeId: recipes[2].id, IngredientId: ingredients[6].id},
            { RecipeId: recipes[2].id, IngredientId: ingredients[26].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[27].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[28].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[29].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[30].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[31].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[32].id },
            { RecipeId: recipes[2].id, IngredientId: ingredients[33].id },

            { RecipeId: recipes[3].id, IngredientId: ingredients[6].id},
            { RecipeId: recipes[3].id, IngredientId: ingredients[13].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[14].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[34].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[35].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[36].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[37].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[38].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[39].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[40].id },
            { RecipeId: recipes[3].id, IngredientId: ingredients[41].id },
        
            { RecipeId: recipes[4].id, IngredientId: ingredients[1].id},
            { RecipeId: recipes[4].id, IngredientId: ingredients[5].id},
            { RecipeId: recipes[4].id, IngredientId: ingredients[6].id},
            { RecipeId: recipes[4].id, IngredientId: ingredients[13].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[14].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[16].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[35].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[40].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[42].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[43].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[44].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[45].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[46].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[47].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[48].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[49].id },
            { RecipeId: recipes[4].id, IngredientId: ingredients[50].id },
        
            { RecipeId: recipes[5].id, IngredientId: ingredients[4].id},
            { RecipeId: recipes[5].id, IngredientId: ingredients[11].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[13].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[15].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[17].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[18].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[35].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[51].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[52].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[53].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[54].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[55].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[56].id },
            { RecipeId: recipes[5].id, IngredientId: ingredients[57].id },
        
            { RecipeId: recipes[6].id, IngredientId: ingredients[11].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[13].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[58].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[59].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[60].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[61].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[62].id },
            { RecipeId: recipes[6].id, IngredientId: ingredients[63].id },
        ])

        // Populate RecipeCategories
        await models.RecipeCategories.bulkCreate([
            { RecipeId: recipes[0].id, CategoryId: categories[13].id }, 
            { RecipeId: recipes[0].id, CategoryId: categories[16].id },
            { RecipeId: recipes[0].id, CategoryId: categories[20].id },
            { RecipeId: recipes[0].id, CategoryId: categories[24].id },
            { RecipeId: recipes[0].id, CategoryId: categories[25].id },
            { RecipeId: recipes[0].id, CategoryId: categories[27].id },

            { RecipeId: recipes[1].id, CategoryId: categories[13].id },
            { RecipeId: recipes[1].id, CategoryId: categories[16].id },
            { RecipeId: recipes[1].id, CategoryId: categories[20].id },
            { RecipeId: recipes[1].id, CategoryId: categories[25].id },
            { RecipeId: recipes[1].id, CategoryId: categories[35].id },
            { RecipeId: recipes[1].id, CategoryId: categories[40].id },
            { RecipeId: recipes[1].id, CategoryId: categories[46].id },
            { RecipeId: recipes[1].id, CategoryId: categories[47].id },

            { RecipeId: recipes[2].id, CategoryId: categories[10].id },
            { RecipeId: recipes[2].id, CategoryId: categories[13].id },
            { RecipeId: recipes[2].id, CategoryId: categories[20].id },
            { RecipeId: recipes[2].id, CategoryId: categories[25].id },
            { RecipeId: recipes[2].id, CategoryId: categories[40].id },

            { RecipeId: recipes[3].id, CategoryId: categories[13].id },
            { RecipeId: recipes[3].id, CategoryId: categories[16].id },
            { RecipeId: recipes[3].id, CategoryId: categories[20].id },
            { RecipeId: recipes[3].id, CategoryId: categories[25].id },
            { RecipeId: recipes[3].id, CategoryId: categories[46].id },
            { RecipeId: recipes[3].id, CategoryId: categories[47].id },
            { RecipeId: recipes[3].id, CategoryId: categories[48].id },
            
            { RecipeId: recipes[4].id, CategoryId: categories[13].id },
            { RecipeId: recipes[4].id, CategoryId: categories[16].id },
            { RecipeId: recipes[4].id, CategoryId: categories[20].id },
            { RecipeId: recipes[4].id, CategoryId: categories[25].id },
            { RecipeId: recipes[4].id, CategoryId: categories[40].id },

            { RecipeId: recipes[5].id, CategoryId: categories[13].id },
            { RecipeId: recipes[5].id, CategoryId: categories[16].id },
            { RecipeId: recipes[5].id, CategoryId: categories[23].id },
            { RecipeId: recipes[5].id, CategoryId: categories[24].id },
            { RecipeId: recipes[5].id, CategoryId: categories[25].id },
            { RecipeId: recipes[5].id, CategoryId: categories[35].id },
            { RecipeId: recipes[5].id, CategoryId: categories[40].id },

            { RecipeId: recipes[6].id, CategoryId: categories[12].id },
            { RecipeId: recipes[6].id, CategoryId: categories[13].id },
            { RecipeId: recipes[6].id, CategoryId: categories[16].id },
            { RecipeId: recipes[6].id, CategoryId: categories[20].id },
            { RecipeId: recipes[6].id, CategoryId: categories[35].id },
        ])

        // Populate Users 
        const users = await models.User.bulkCreate([
            {
                email: "jhondoe@domain.ca",
                full_name: "John Doe",
                password: "",
                weight: 90,
                gender: "Male",
                goal: "Maintain Weight"
            },
            {
                email: "janesmith@domain.ca",
                full_name: "Jane Smith",
                password: "",
                weight: 80,
                gender: "Female",
                goal: "Lose Weight"
            },
            {
                email: "spoon@domain.ca",
                full_name: "Spoon Smith",
                password: "",
                weight: 66,
                gender: "Other",
                goal: "Gain Weight"
            }
        ])

        // Populate UserAllergies
        await users[0].addAllergy(allergies[0].id)
        await users[0].addAllergy(allergies[4].id)
        await users[1].addAllergy(allergies[2].id)
        await users[2].addAllergy(allergies[2].id)
        await users[2].addAllergy(allergies[3].id)
        await users[2].addAllergy(allergies[4].id)
        await users[2].addAllergy(allergies[5].id)
        await users[2].addAllergy(allergies[6].id)

        // Populate UserDietaryRestrictions
        await users[1].addDietaryRestriction(dietRest[0].id)
        await users[2].addDietaryRestriction(dietRest[2].id)
        await users[2].addDietaryRestriction(dietRest[3].id)
        await users[2].addDietaryRestriction(dietRest[4].id)

        // Populate MealHistory
        await models.MealHistory.bulkCreate([
            { userId: users[0].id, recipeId: recipes[4].id },
            { userId: users[0].id, recipeId: recipes[1].id },
            { userId: users[0].id, recipeId: recipes[0].id },
            { userId: users[1].id, recipeId: recipes[5].id },
            { userId: users[1].id, recipeId: recipes[2].id },
            { userId: users[2].id, recipeId: recipes[3].id },
            { userId: users[2].id, recipeId: recipes[5].id },
            { userId: users[2].id, recipeId: recipes[6].id },
        ])

        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating the database:', error);
    }
}

module.exports = populateDatabase;