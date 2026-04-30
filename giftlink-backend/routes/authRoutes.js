// Step 1 - Task 2: Import necessary packages
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

const router = express.Router();

// Step 1 - Task 3: Create logger
const logger = pino();

dotenv.config();

// Step 1 - Task 4: JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// =============================
// REGISTER ROUTE
// =============================
router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to DB
        const db = await connectToDatabase();

        // Task 2: Access collection
        const collection = db.collection("users");

        // Task 3: Check existing email
        const existingEmail = await collection.findOne({ email: req.body.email });

        if (existingEmail) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const email = req.body.email;

        // Task 4: Save user
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        // Task 5: Create JWT
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');

        res.json({ authtoken, email });

    } catch (e) {
        console.error(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;