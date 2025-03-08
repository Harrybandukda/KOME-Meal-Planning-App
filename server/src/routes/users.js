const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
		
        const newUser = await userController.createUser(username, email, password);

        res.status(201).json({ message: "User created successfully.", id: newUser.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userController.loginUser(username, password);

        res.status(200).json({ message: "Login successful.", id: user.id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const user = await userController.getUser(id);

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, full_name, weight, gender, goal } = req.body;

        const user = await userController.updateUser(id, username, email, full_name, weight, gender, goal);

        res.status(204).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/update/password', async (req, res) => {
    try{ 
        const { id, password } = req.body
        
        await  userController.updatePassword(id, password); 

        res.status(204).json({message: "Sucessfully updated password."});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Update Weight
router.put('/update/weight', async (req, res) => {
    try{ 
        const { id, weight } = req.body
        
        await  userController.updateWeight(id, weight) 

        res.status(204).json({message: "Sucessfully updated weight."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Update Goal
router.put('/update/weight', async (req, res) => {
    try{ 
        const { id, goal } = req.body
        
        await  userController.updateGoal(id, goal) 

        res.status(204).json({message: "Sucessfully updated goal."})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;