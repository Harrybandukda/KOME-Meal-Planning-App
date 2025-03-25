const { models } = require('../database');

const profileController = {
    updatePicture: async (pic) => {
        // currently non existant 
    },
    updateName: async (userId, name) => { // under debate
        try {
            // Need name input length limit 
            if(/^[a-zA-Z]+$/.test(name) && name.length < 20) {

            }
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    },
    updateWeight: async (userId, weight) => {
        try {
            // Should be some frontend code that ensures valid weight
            const user = await models.User.findByPk(userId)

            if (!user) {
                throw Error("User not found.")
            }

            user.weight = weight
            await user.save()

            return user
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    },
    updateGoal: async (goal) => {
        // Under debate
    },
    updateAllergies: async (userId, allergies) => {
        try {
            // Check existing allergies 
            const currentAllergies = await models.User.findAll({ where: { id: userId }, include: models.Allergies})

            // if no allergies 
            if(!currentAllergies || currentAllergies.length == 0){
                await allergies.forEach(allergy => {
                    models.UserAllergies.create({ UserId: userId, AllergyId: allergy.id })
                    console.log("Allergy added")
                });
                return 
            }

            const currentAllergyIds = currentAllergies.map(allergy => allergy.AllergyId);
            const newAllergies = allergies.filter(allergyId => !currentAllergyIds.includes(allergyId));
            const oldAllergies = currentAllergyIds.filter(id => !allergies.includes(id));
            
            // Add new allergies
            if (newAllergies.length > 0){
                await Promise.all(newAllergies.map(async (allergyId) => {
                    await models.UserAllergies.create({ UserId: userId, AllergyId: id })
                }))
            }

            // Delete old allergies 
            if (oldAllergies.length > 0) {
                await models.UserAllergies.destroy({
                    where: { UserId: userId, AllergyId: oldAllergies }
                });
            }

            console.log("Allergies Updated")
            return "Allergies updated"
        } catch (err) {
            console.log(err.message)
            throw new Error(err.message)
        }
    },
    updateDietaryRestrictions: async (userId, restrictions) => {
        try {
            // Check existing restrictions
            const currentRestrictions = await models.UserDietaryRestrictions.findAll({ where: { id: userId }})

            // if none
            if(!currentRestrictions || currentRestrictions.length == 0){
                await restrictions.forEach( async (restrictions) => {
                    await models.UserDietaryRestrictions.create({ UserId: userId, DietaryRestrictionsId: restrictions.id })
                    console.log("Added restriction")
                })
            }

            // for ease, restrictions & currentRestrictions becomes just ids
            const restrictionIds = restrictions.map(restriction => restriction.DietaryRestrictionsId)
            const currentRestrictionsId = currentRestrictions.map(restriction => restriction.DietaryRestrictionsId)
            
            // get new restriction ids 
            const newRestrictions = restrictionId.filter(id => !currentRestrictionsId.includes(id))
            
            // get restriction ids that no longer exist 
            const oldRestrictions = currentRestrictionsId.filter(id => !restrictions.includes(id))

            // Add new Restrictions
            if (newRestrictions.length > 0) {
                await Promise.all(newRestrictions.map(async (id) => {
                    await models.UserDietaryRestrictions.create({ UserId: userId, DietaryRestrictionsId: id})
                    console.log("Restriction added")
                }))
            }

            // Delete old Restrictions
            if (oldRestrictions.length > 0) {
                await models.UserDietaryRestrictions.destroy({
                    where: { UserId: userId, DietaryRestrictionsId: oldRestrictions }
                })
            }

            console.log("Restrictions updated")
            return "Dietary Restrictions updated"
            
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    },
    updateMealHistory: async (userId, recipeId) => {
        try{ 
            const mealHistory = await models.MealHistory.findAll({ where: { UserId: userId, RecipeId: recipeId }})
            
            mealHistory.filter
        } catch (err) {
            console.log(err.message)
            return err.message
        }
    }
}