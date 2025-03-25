const express = require('express');
const router = express.Router();
const allergiesController = require('../controllers/allergies');

// Get all allergies 
router.get('/', async (req, res) => {
    try {
        const allergies = await allergiesController.getAllergies()

        res.status(200).send(allergies)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get allergies by id 
router.get('/:id', async (req, res) => {
    try {
        const allergy  = await allergiesController.getAllergy(req.params.id)
        res.status(200).send(allergy)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get allergies by userId
router.get('/:id', async (req, res) => {
    try{
        const userAllergies = await allergiesController.getUserAllergies(req.params.id)
        res.status(200).send(userAllergies)
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Create new allergy
router.post('/create/:name', async (req, res) => {
    try {
        await allergiesController.addAllergy(req.params.name)

        res.status(201).json({message: "Sucessfully created allergy."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Update Allergies 
router.put('/update/allergies', async (req, res) => {
    try{
        const { id, allergies } = req.body

        await allergiesController.updateAllergies(id, allergies)

        res.status(204).json({message: "Sucessfully updated allergies."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router