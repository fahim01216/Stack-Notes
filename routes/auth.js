const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();

const JWT_SECRET = 'HFHSDFHUWYNBVNJIOA';

// Create a user using POST: /api/auth/create
router.post('/signup', async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user already exists with this email" })
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });

        const payload = {
            user: {
                id: user.id
            }
        }
    
        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    }
    catch(err) {
        res.json({error: err.message})
    }
})


// Authenticate a user using POST: /api/auth/login
router.post('/login', async (req, res) => {
    
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const {email, password} = req.body;

    // Authenticate a user
    try {
        let user = await User.findOne({email}).select('+password');
        if(!user) {
            success = false;
            return res.status(404).json({error: 'Invalid Credentials !!'});
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (isPasswordMatched) {
            success = false;
            return res.status(404).json({ success, error: "Invalid Credentials!!" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    }
     catch (err) {
        res.json({error: err.message})
    }
})


// Get logged in user details using POST: /api/auth/getuser
router.post('/getuser', fetchUser, async (req, res) => {
    
    // Authenticate a user
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
     catch (err) {
        res.json({error: err.message});
    }
})

module.exports = router;