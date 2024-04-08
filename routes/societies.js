const express = require('express');
const Society = require('../models/societies');


const router = express.Router();

// POST: Add a new society
router.post('/', async (req, res) => {
    let society = new Society(req.body);
    console.log(society); // Check what was received

    try {
        society = await society.save();
        res.location(`${society._id}`).status(201).json(society);
    } catch (error) {
        res.status(500).send('db_error ' + error);
    }
});

// GET: Retrieve all societies
router.get('/', async (req, res) => {
    console.log('in get route');
    try {
        const societies = await Society.find();
        res.json(societies);
    } catch (error) {
        res.status(500).json('db error ' + error);
    }
});

// GET: Retrieve a society by ID
router.get('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const society = await Society.findById(id);

        if (society) {
            res.json(society);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        res.status(404).json('id is incorrect' + error);
    }
});

// DELETE: Remove a society by ID
router.delete('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const society = await Society.findByIdAndDelete(id);

        if (society) {
            res.json(society);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        res.status(404).json('id is incorrect' + error);
    }
});

// PUT: Update a society by ID
router.put('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const society = await Society.findByIdAndUpdate(id, req.body, { new: true });

        if (society) {
            res.json(society);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        res.status(404).json('id is incorrect' + error);
    }
});

module.exports = router;
