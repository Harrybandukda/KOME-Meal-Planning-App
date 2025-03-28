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
                cookware: "Baking Tray;Mixing Bowl;Measuring Cups;Spoon",
                servings: 2,
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2021/03/Gluten-Free-Turkey-Meatballs-2.jpg",
                description: "These gluten free turkey meatballs are so quick and easy to make using a pressure cooker that you’ll want them in your regular dinner rotation. Plus they’re dairy, egg, soy, and gluten free!",
                instructions: "Start by combining all of the ingredients in a small saucepan and cook over medium heat until it bubbles. Turn down the heat to low and simmer for 5 minutes. Add barbecue sauce."
            },
            {
                name: "Vegan Black Bean Soup",
                author: "Ali",
                cookware: "Sauce Pan;Mixing Bowl;Spoon",
                servings: 3,
                link: "https://www.gimmesomeoven.com/wp-content/uploads/2024/12/Quick-Black-Bean-Soup-12.jpg",
                description: "This quick black bean soup recipe is full of flavor and protein and comes together in less than 30 minutes!",
                instructions: "Heat the oil in a large stockpot over medium-high heat. Add the onion, carrot, bell pepper and sauté for 6 minutes. Add in the garlic, cumin, chili powder and chipotle powder and sauté. Add the vegetable broth and black beans and stir to combine."
            },
            {
                name: "Cream of Mushroom Soup",
                author: "Kristi",
                cookware: "Sauce Pan;Mixing Bowl;Spoon",
                servings: 3,
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/08/Cream-of-mushroom-soup-2-1024x1024.png",
                description: "This cream of mushroom soup is a versatile dish that can be eaten by the bowl or kept thicker to use in casseroles.",
                instructions: "Heat beef stock and 4 cups of rice milk in a large soup pot and bring to a boil. Add crushed rice noodles and salt. Add stirred mushroom. When soup is thick, using a hand held immersion blender, puree the soup until smooth. Add rice milk. "
            },
            {
                name: "Quinoa and Rice With Sweet Potatoes",
                author: "Kristi",
                cookware: "Sauce Pan;Mixing Bowl;Spoon",
                servings: 2,
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/08/Quinoa-and-rice-with-sweet-potatoes-2.png",
                description: "Hearty and nutritious quinoa and rice with sweet potatoes is a satisfying dish that can be a side dish or a meal on its own and it's free of the top 8 allergens.",
                instructions: "Chopped vegetables saute in extra virgin olive oil over medium heat. When your veggies are done cooking and you've rinsed the quinoa, you can combine all ingredients in a casserole dish and bake 30 minutes at 400 F."
            },
            {
                name: "Dairy Free Chicken Pot Pie {Allergy Friendly}",
                author: "Kristi",
                cookware: "Sauce Pan;Measuring Cups;Spoon",
                servings: 2,
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/10/Chicken-pot-pie-2.jpg",
                description: "A hearty, creamy chicken stew is topped with pie crust rounds to create single servings of gluten and dairy free chicken pot pie. It's a spin on the traditional dish but is free from other common allergens so everyone can enjoy it!",
                instructions: "Stir in the broth and dairy free milk. Add fried chicken breast with stirred vegetables. Cook and stir until the mixture is thickened. Serve topped with a pie crust round from gluten-free flour."
            },
            {
                name: "Gluten-Free Chili {Allergy Friendly}", 
                author: "Kristi",
                cookware: "Sauce Pan;Spoon",
                servings: 1,
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2023/03/Gluten-free-chili-featured.jpg",
                description: "This gluten-free chili is a delicious and healthy dish that is so easy to make on the stovetop, Instant Pot, or slow cooker. It's free from common allergens like wheat, dairy, and soy so it can be enjoyed by everyone",
                instructions: "Saute the meat, onion, and celery. Once the meat is browned and the onion and celery are tender, add the garlic and seasonings and cook for another minute. Then, turn off heat and add the other ingredients."
            },
            {
                name: "Gluten and Dairy Free Mexican Lasagna", 
                author: "Kristi",
                cookware: "Baking Tray;Sauce Pan;Measuring Cups;Spoon",
                servings: 4,
                link: "https://www.eatingwithfoodallergies.com/wp-content/uploads/2020/07/Untitled-design-34-1024x1024.png",
                description: "Looking for an easy dinner that your whole family will love and is free of the top 8 allergens? Try this gluten and dairy free Mexican lasagna! It's on my regular weeknight meal rotation because it's simple to make and my family loves it!",
                instructions: "Brown the ground turkey in a skillet until no longer pink. Add the onion and cook until translucent. Add the taco seasoning and water. Stir in the beans, salsa, and corn and cook over medium heat until bubbling."
            },
        ]);

        // Populate ingredients 
        const ingredients = await models.Ingredient.bulkCreate([
            { name: "Glutten Free Bread Crumbs", unit: "cup" },
            { name: "Dairy Free Milk", unit: "cup" },
            { name: "Ground Beef", unit: "lb" },
            { name: "Ground Pork", unit: "lb" },
            { name: "Brown Sugar", unit: "tbsp" },
            { name: "Ground Pepper", unit: "tsp" },
            { name: "Salt", unit: "tsp" },
            { name: "Nutmeg", unit: "tsp" },
            { name: "Onion Powder", unit: "tsp" },
            { name: "Garlic Powder", unit: "tsp" },
            { name: "Allspice", unit: "tsp" },
            { name: "Black Beans", unit: "can" },
            { name: "Tomatoes", unit: "piece" },
            { name: "Yellow Onions", unit: "piece" },
            { name: "Carrots", unit: "piece" },
            { name: "Red Bell Pepper", unit: "piece" },
            { name: "Garlic", unit: "clove" },
            { name: "Ground Cumin", unit: "tsp" },
            { name: "Chili Powder", unit: "tsp" },
            { name: "Chipotle Powder", unit: "tsp" },
            { name: "Veggetable Broth", unit: "cup" },
            { name: "Lime", unit: "piece" },
            { name: "Cilantro", unit: "tbsp" },
            { name: "Cheddar Cheese", unit: "cup" },
            { name: "Avacado", unit: "piece" },
            { name: "Red Onion", unit: "piece" },
            { name: "Mushrooms", unit: "cup" },
            { name: "Beef Stock", unit: "cup" },
            { name: "Rice Milk", unit: "cup" },
            { name: "Rice Noodles", unit: "oz" },
            { name: "Canola Oil", unit: "tbsp" },
            { name: "Shallots", unit: "piece" },
            { name: "Button Mushrooms", unit: "cup" },
            { name: "Dry Sherry", unit: "tbsp" },
            { name: "Extra Virgin Olive Oil", unit: "tbsp" },
            { name: "Celery", unit: "stalk" },
            { name: "Sweet Potato", unit: "piece" },
            { name: "Brown Rice", unit: "cup" },
            { name: "Quinoa", unit: "cup" },
            { name: "Chicken Broth", unit: "cup" },
            { name: "Dried Thyme Leaves", unit: "tsp" },
            { name: "Cooking Spray", unit: "spray" },
            { name: "Chicken Breast", unit: "piece" },
            { name: "Glutten Free All Purpose Flower", unit: "cup" },
            { name: "Rubbed Sage", unit: "tsp" },
            { name: "Glutten Free Chicken Stock", unit: "cup" },
            { name: "Frozen Mixed Vegetables", unit: "cup" },
            { name: "Sugar", unit: "tbsp" },
            { name: "Dairy Free Margarine", unit: "tbsp" },
            { name: "Shortening", unit: "tbsp" },
            { name: "Vinegar", unit: "tbsp" },
            { name: "Lean Ground Beef", unit: "lb" },
            { name: "Dried Oregano", unit: "tsp" },
            { name: "Marinara Sauce", unit: "cup" },
            { name: "Diced Tomatoes and Green Chilis", unit: "can" },
            { name: "Dark Red Kidney Beans", unit: "can" },
            { name: "Gluten Free Beef Broth", unit: "cup" },
            { name: "Bay Leaves", unit: "leaf" },
            { name: "Ground Turkey", unit: "lb" },
            { name: "Gluten Free Taco Seasoning", unit: "tbsp" },
            { name: "Tomato Salsa", unit: "cup" },
            { name: "Froxen Corn", unit: "cup" },
            { name: "Corn Tortillas", unit: "piece" },
            { name: "Dairy Free Cheese", unit: "cup" },
        ]);

        // Populate RecipeIngredients
        await models.RecipeIngredients.bulkCreate([
            { RecipeId: recipes[0].id, IngredientId: ingredients[0].id, amount: 1 },      // 1 cup Glutten Free Bread Crumbs
            { RecipeId: recipes[0].id, IngredientId: ingredients[1].id, amount: 0.5 },    // 0.5 cup Dairy Free Milk
            { RecipeId: recipes[0].id, IngredientId: ingredients[2].id, amount: 0.5 },    // 0.5 lb Ground Beef
            { RecipeId: recipes[0].id, IngredientId: ingredients[3].id, amount: 0.5 },    // 0.5 lb Ground Pork
            { RecipeId: recipes[0].id, IngredientId: ingredients[4].id, amount: 1 },      // 1 tbsp Brown Sugar
            { RecipeId: recipes[0].id, IngredientId: ingredients[5].id, amount: 0.5 },    // 0.5 tsp Ground Pepper
            { RecipeId: recipes[0].id, IngredientId: ingredients[6].id, amount: 1 },      // 1 tsp Salt
            { RecipeId: recipes[0].id, IngredientId: ingredients[7].id, amount: 0.25 },   // 0.25 tsp Nutmeg
            { RecipeId: recipes[0].id, IngredientId: ingredients[8].id, amount: 0.5 },    // 0.5 tsp Onion Powder
            { RecipeId: recipes[0].id, IngredientId: ingredients[9].id, amount: 0.5 },    // 0.5 tsp Garlic Powder
            { RecipeId: recipes[0].id, IngredientId: ingredients[10].id, amount: 0.25 },  // 0.25 tsp Allspice        

            // Vegan Black Bean Soup
            { RecipeId: recipes[1].id, IngredientId: ingredients[11].id, amount: 2 },    // 2 cans Black Beans
            { RecipeId: recipes[1].id, IngredientId: ingredients[12].id, amount: 2 },    // 2 Tomatoes
            { RecipeId: recipes[1].id, IngredientId: ingredients[13].id, amount: 1 },    // 1 Onion
            { RecipeId: recipes[1].id, IngredientId: ingredients[14].id, amount: 2 },    // 2 Carrots
            { RecipeId: recipes[1].id, IngredientId: ingredients[15].id, amount: 1 },    // 1 Red Bell Pepper
            { RecipeId: recipes[1].id, IngredientId: ingredients[16].id, amount: 3 },    // 3 Garlic Cloves
            { RecipeId: recipes[1].id, IngredientId: ingredients[17].id, amount: 1 },    // 1 tsp Ground Cumin
            { RecipeId: recipes[1].id, IngredientId: ingredients[18].id, amount: 1 },    // 1 tsp Chili Powder
            { RecipeId: recipes[1].id, IngredientId: ingredients[19].id, amount: 0.5 },  // 0.5 tsp Chipotle Powder
            { RecipeId: recipes[1].id, IngredientId: ingredients[20].id, amount: 4 },    // 4 cups Vegetable Broth
            { RecipeId: recipes[1].id, IngredientId: ingredients[21].id, amount: 1 },    // 1 Lime
            { RecipeId: recipes[1].id, IngredientId: ingredients[22].id, amount: 2 },    // 2 tbsp Cilantro
            { RecipeId: recipes[1].id, IngredientId: ingredients[23].id, amount: 0.5 },  // 0.5 cup Cheddar Cheese (optional garnish)
            { RecipeId: recipes[1].id, IngredientId: ingredients[24].id, amount: 1 },    // 1 Avocado (sliced)
            { RecipeId: recipes[1].id, IngredientId: ingredients[25].id, amount: 0.5 },  // 0.5 Red Onion

            // Cream of Mushroom Soup
            { RecipeId: recipes[2].id, IngredientId: ingredients[6].id, amount: 1 },     // 1 tsp Salt
            { RecipeId: recipes[2].id, IngredientId: ingredients[26].id, amount: 2 },    // 2 cups Mushrooms
            { RecipeId: recipes[2].id, IngredientId: ingredients[27].id, amount: 4 },    // 4 cups Beef Stock
            { RecipeId: recipes[2].id, IngredientId: ingredients[28].id, amount: 2 },    // 2 cups Rice Milk
            { RecipeId: recipes[2].id, IngredientId: ingredients[29].id, amount: 8 },    // 8 oz Rice Noodles
            { RecipeId: recipes[2].id, IngredientId: ingredients[30].id, amount: 1 },    // 1 tbsp Canola Oil
            { RecipeId: recipes[2].id, IngredientId: ingredients[31].id, amount: 2 },    // 2 Shallots
            { RecipeId: recipes[2].id, IngredientId: ingredients[32].id, amount: 1 },    // 1 cup Button Mushrooms
            { RecipeId: recipes[2].id, IngredientId: ingredients[33].id, amount: 1 },    // 1 tbsp Dry Sherry

            // Quinoa and Rice With Sweet Potatoes
            { RecipeId: recipes[3].id, IngredientId: ingredients[6].id, amount: 1 },     // 1 tsp Salt
            { RecipeId: recipes[3].id, IngredientId: ingredients[13].id, amount: 1 },    // 1 Onion
            { RecipeId: recipes[3].id, IngredientId: ingredients[14].id, amount: 2 },    // 2 Carrots
            { RecipeId: recipes[3].id, IngredientId: ingredients[34].id, amount: 2 },    // 2 stalks Celery
            { RecipeId: recipes[3].id, IngredientId: ingredients[35].id, amount: 1 },    // 1 Sweet Potato
            { RecipeId: recipes[3].id, IngredientId: ingredients[36].id, amount: 1 },    // 1 cup Brown Rice
            { RecipeId: recipes[3].id, IngredientId: ingredients[37].id, amount: 1 },    // 1 cup Quinoa
            { RecipeId: recipes[3].id, IngredientId: ingredients[38].id, amount: 4 },    // 4 cups Chicken Broth
            { RecipeId: recipes[3].id, IngredientId: ingredients[39].id, amount: 0.5 },  // 0.5 tsp Thyme
            { RecipeId: recipes[3].id, IngredientId: ingredients[40].id, amount: 1 },    // 1 spray Cooking Spray
            { RecipeId: recipes[3].id, IngredientId: ingredients[41].id, amount: 2 },    // 2 Chicken Breasts

            // Dairy Free Chicken Pot Pie
            { RecipeId: recipes[4].id, IngredientId: ingredients[1].id, amount: 1 },     // 1 cup Dairy Free Milk
            { RecipeId: recipes[4].id, IngredientId: ingredients[5].id, amount: 0.5 },   // 0.5 tsp Pepper
            { RecipeId: recipes[4].id, IngredientId: ingredients[6].id, amount: 1 },     // 1 tsp Salt
            { RecipeId: recipes[4].id, IngredientId: ingredients[13].id, amount: 1 },    // 1 Onion
            { RecipeId: recipes[4].id, IngredientId: ingredients[14].id, amount: 2 },    // 2 Carrots
            { RecipeId: recipes[4].id, IngredientId: ingredients[16].id, amount: 2 },    // 2 Garlic Cloves
            { RecipeId: recipes[4].id, IngredientId: ingredients[35].id, amount: 1 },    // 1 Sweet Potato
            { RecipeId: recipes[4].id, IngredientId: ingredients[40].id, amount: 1 },    // 1 spray Cooking Spray
            { RecipeId: recipes[4].id, IngredientId: ingredients[42].id, amount: 1 },    // 1 cup Gluten-Free All-Purpose Flour
            { RecipeId: recipes[4].id, IngredientId: ingredients[43].id, amount: 0.5 },  // 0.5 tsp Sage
            { RecipeId: recipes[4].id, IngredientId: ingredients[44].id, amount: 2 },    // 2 cups Chicken Stock
            { RecipeId: recipes[4].id, IngredientId: ingredients[45].id, amount: 2 },    // 2 cups Frozen Mixed Vegetables
            { RecipeId: recipes[4].id, IngredientId: ingredients[46].id, amount: 1 },    // 1 tbsp Sugar
            { RecipeId: recipes[4].id, IngredientId: ingredients[47].id, amount: 2 },    // 2 tbsp Margarine
            { RecipeId: recipes[4].id, IngredientId: ingredients[48].id, amount: 1 },    // 1 tbsp Shortening
            { RecipeId: recipes[4].id, IngredientId: ingredients[49].id, amount: 1 },    // 1 tbsp Vinegar
            { RecipeId: recipes[4].id, IngredientId: ingredients[50].id, amount: 1 },    // 1 lb Lean Ground Beef

            // Gluten-Free Chili
            { RecipeId: recipes[5].id, IngredientId: ingredients[4].id, amount: 1 },     // 1 tbsp Brown Sugar
            { RecipeId: recipes[5].id, IngredientId: ingredients[11].id, amount: 1 },    // 1 can Black Beans
            { RecipeId: recipes[5].id, IngredientId: ingredients[13].id, amount: 1 },    // 1 Onion
            { RecipeId: recipes[5].id, IngredientId: ingredients[15].id, amount: 1 },    // 1 Red Bell Pepper
            { RecipeId: recipes[5].id, IngredientId: ingredients[17].id, amount: 1 },    // 1 tsp Cumin
            { RecipeId: recipes[5].id, IngredientId: ingredients[18].id, amount: 1 },    // 1 tsp Chili Powder
            { RecipeId: recipes[5].id, IngredientId: ingredients[35].id, amount: 1 },    // 1 Sweet Potato
            { RecipeId: recipes[5].id, IngredientId: ingredients[51].id, amount: 1 },    // 1 lb Ground Turkey
            { RecipeId: recipes[5].id, IngredientId: ingredients[52].id, amount: 2 },    // 2 tbsp Oregano
            { RecipeId: recipes[5].id, IngredientId: ingredients[53].id, amount: 1 },    // 1 cup Marinara
            { RecipeId: recipes[5].id, IngredientId: ingredients[54].id, amount: 1 },    // 1 can Diced Tomatoes + Green Chilis
            { RecipeId: recipes[5].id, IngredientId: ingredients[55].id, amount: 1 },    // 1 can Kidney Beans
            { RecipeId: recipes[5].id, IngredientId: ingredients[56].id, amount: 2 },    // 2 cups Gluten-Free Beef Broth
            { RecipeId: recipes[5].id, IngredientId: ingredients[57].id, amount: 2 },    // 2 Bay Leaves

            // Gluten and Dairy Free Mexican Lasagna
            { RecipeId: recipes[6].id, IngredientId: ingredients[11].id, amount: 1 },    // 1 can Black Beans
            { RecipeId: recipes[6].id, IngredientId: ingredients[13].id, amount: 1 },    // 1 Onion
            { RecipeId: recipes[6].id, IngredientId: ingredients[58].id, amount: 1 },    // 1 lb Ground Turkey
            { RecipeId: recipes[6].id, IngredientId: ingredients[59].id, amount: 2 },    // 2 tbsp Taco Seasoning
            { RecipeId: recipes[6].id, IngredientId: ingredients[60].id, amount: 1 },    // 1 cup Tomato Salsa
            { RecipeId: recipes[6].id, IngredientId: ingredients[61].id, amount: 1 },    // 1 cup Frozen Corn
            { RecipeId: recipes[6].id, IngredientId: ingredients[62].id, amount: 6 },    // 6 Corn Tortillas
            { RecipeId: recipes[6].id, IngredientId: ingredients[63].id, amount: 1 },    // 1 cup Dairy Free Cheese

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