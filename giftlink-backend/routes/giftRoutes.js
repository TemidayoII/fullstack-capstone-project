/*jshint esversion: 8 */
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// GET ALL GIFTS
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

// GET GIFT BY ID
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const gift = await collection.findOne({ id: req.params.id });

        if (!gift) {
            return res.status(404).send("Gift not found");
        }

        res.json(gift);
    } catch (e) {
        next(e);
    }
});

// POST NEW GIFT
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const result = await collection.insertOne(req.body);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
});

module.exports = router;