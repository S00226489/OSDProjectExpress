const express = require('express');
const router = express.Router();
const Society = require('../models/society'); // Assume your society model file is named society.js

router.get('/', async (req, res) => {
  try {
    const societies = await Society.find();
    res.status(200).json(societies);
  } catch (error) {
    res.status(500).send(`Database error: ${error}`);
  }
});

router.post('/', async (req, res) => {
  const society = new Society({
    ...req.body // Spread operator to copy all properties from the request body to the new Society object
  });

  try {
    const savedSociety = await society.save();
    res.status(201).json(savedSociety);
  } catch (error) {
    res.status(400).send(`Error creating society: ${error}`);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSociety = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSociety) {
      return res.status(404).send('Society not found');
    }
    res.json(updatedSociety);
  } catch (error) {
    res.status(400).send(`Error updating society: ${error}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);
    if (!society) {
      return res.status(404).send('Society not found');
    }
    res.send({ message: `Society '${society.name}' successfully deleted.` });
  } catch (error) {
    res.status(500).send(`Database error: ${error}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) {
      return res.status(404).send('Society not found');
    }
    res.json(society);
  } catch (error) {
    res.status(500).send(`Database error: ${error}`);
  }
});

module.exports = router;
