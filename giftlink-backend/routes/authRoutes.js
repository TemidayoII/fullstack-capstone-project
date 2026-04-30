const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

dotenv.config();

// Logger
const logger = pino();

// JWT Secret
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
        console.log(e);
        return res.status(500).send('Internal server error');
    }
});


/* =========================
   LOGIN ENDPOINT
========================= */
router.post('/login', async (req, res) => {
    try {

        // Task 1: connect DB
        const db = await connectToDatabase();

        // Task 2: users collection
        const collection = db.collection("users");

        // Task 3: find user
        const theUser = await collection.findOne({ email: req.body.email });

        // Task 7: user not found
        if (!theUser) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Task 4: check password
        const result = await bcryptjs.compare(req.body.password, theUser.password);

        if (!result) {
            logger.error('Passwords do not match');
            return res.status(404).json({ error: 'Wrong password' });
        }

        // Task 5: fetch user details
        const userName = theUser.firstName;
        const userEmail = theUser.email;

        // Task 6: JWT token
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
        console.log(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;