const express = require('express')

const router = express.Router();

// Some silly routes for fun

router.get('/', (req, res) => res.send('Hello World from Aiden!'))

router.get('/fruit/apples', (req, res) =>
  res.send('hello world, this is apples '));

  router.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));

module.exports = router