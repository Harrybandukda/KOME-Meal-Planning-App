const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const sessionController = require('../controllers/session');

router.post('/signup', async (req, res) => {
    try {
        const { email, password, full_name } = req.body;
		
        const newUser = await userController.createUser(email, password, full_name);

        const session = await sessionController.createSession(newUser.id);

        res.status(201).json({ message: "User created successfully.", id: newUser.id, token: session.identifier });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userController.loginUser(email, password);

        const session = await sessionController.createSession(user.id);

        res.status(200).json({ message: "Login successful.", id: user.id, token: session.identifier });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await sessionController.rejectIfNotAuthorized(req, id);

        const user = await userController.getUser(id);

        res.status(200).json(user);
    } catch (err) {
        if (err.message === "Unauthorized") {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { email, full_name, weight, gender, goal } = req.body;

        await sessionController.rejectIfNotAuthorized(req, id);

        const user = await userController.updateUser(id, email, full_name, weight, gender, goal);

        res.status(204).json(user);
    } catch (err) {
        if (err.message === "Unauthorized") {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
});

router.put('/update/password', async (req, res) => {
    try{ 
        const { id, password } = req.body;

        await sessionController.rejectIfNotAuthorized(req, id);
        
        await userController.updatePassword(id, password); 

        res.status(204).json({message: "Sucessfully updated password."});
    } catch(err) {
        if (err.message === "Unauthorized") {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
})

// Update Weight
router.put('/update/weight', async (req, res) => {
    try{ 
        const { id, weight } = req.body

        await sessionController.rejectIfNotAuthorized(req, id);
        
        await  userController.updateWeight(id, weight) 

        res.status(204).json({message: "Sucessfully updated weight."})
    } catch(err) {
        if (err.message === "Unauthorized") {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
})

// Update Goal
router.put('/update/weight', async (req, res) => {
    try{ 
        const { id, goal } = req.body

        await sessionController.rejectIfNotAuthorized(req, id);
        
        await  userController.updateGoal(id, goal) 

        res.status(204).json({message: "Sucessfully updated goal."})
    } catch(err) {
        if (err.message === "Unauthorized") {
            res.status(401).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
})

module.exports = router;