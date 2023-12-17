const express = require('express');
const { Student } = require('../models/students'); // Change to the Student model

const router = express.Router();

// POST: Add a new student
router.post('/', async (req, res) => {
    let student = new Student(req.body);
    console.log(student); // Check what was received

    try {
        student = await student.save();
        res.location(`${student._id}`).status(201).json(student);
    } catch (error) {
        res.status(500).send('db_error ' + error);
    }
});

// GET: Retrieve all students
router.get('/', async (req, res) => {


    console.log('in get route');
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json('db error ' + error);
    }
});

// GET: Retrieve a student by ID
router.get('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const student = await Student.findById(id);

        if (student) {
            res.json(student);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        res.status(404).json('id is incorrect' + error);
    }
});

// DELETE: Remove a student by ID
router.delete('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const student = await Student.findByIdAndDelete(id);

        if (student) {
            res.json(student);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        res.status(404).json('id is incorrect' + error);
    }
});

// PUT: Update a student by ID
router.put('/:id', async (req, res) => {
    let id = req.params.id;

    try {
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });

        if (student) {
            res.json(student);
        } else {
            res.status(404).json('not found');
        }
    } catch (error) {
        res.status(404).json('id is incorrect' + error);
    }
});

module.exports = router;
