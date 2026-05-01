const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

dotenv.config();

const logger = pino();
const JWT_SECRET = process.env.JWT_SECRET;

/* =========================
   REGISTER ENDPOINT
========================= */
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingEmail = await collection.findOne({ email: req.body.email });

        if (existingEmail) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const newUser = await collection.insertOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            createdAt: new Date(),
        });

        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User registered successfully');

        res.json({
            authtoken,
            email: req.body.email
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

/* =========================
   LOGIN ENDPOINT
========================= */
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const theUser = await collection.findOne({ email: req.body.email });

        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await bcryptjs.compare(req.body.password, theUser.password);

        if (!result) {
            logger.error('Passwords do not match');
            return res.status(404).json({ error: 'Wrong password' });
        }

        const userName = theUser.firstName;
        const userEmail = theUser.email;

        const payload = {
            user: {
                id: theUser._id,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User logged in successfully');

        res.json({
            authtoken,
            userName,
            userEmail
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

/* =========================
   UPDATE ENDPOINT
========================= */
router.put('/update', async (req, res) => {

    // Task 2: Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Task 3: Check for email in headers
        const email = req.headers.email;
        if (!email) {
            logger.error('Email not found in the request headers');
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        // Task 4: Connect to MongoDB and access users collection
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Task 5: Find user credentials in database
        const existingUser = await collection.findOne({ email });
        if (!existingUser) {
            logger.error('User not found');
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.firstName = req.body.name;
        existingUser.updatedAt = new Date();

        // Task 6: Update user credentials in database
        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        // Task 7: Create JWT with updated user._id as payload
        const payload = {
            user: {
                id: updatedUser._id.toString(),
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);
        logger.info('User updated successfully');
        res.json({ authtoken });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;