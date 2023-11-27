// Import the dotenv library to load environment variables
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from the .env file

const express = require('express');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 3001;

const db = require('./database');
const contacts = require('./routes/contacts');
const events = require('./routes/events');
const home = require('./routes/home');
const students = require('./routes/students');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

// Students route
app.get('/api/v1/students', (req, res) => {
  res.json(students);
});

app.use('/api/v1/contacts/', contacts);
app.use('/api/v1/events/', events);
app.use('/', home);
app.use('/contacts', cors(), contacts);
app.use('/api/v1/students', students);
app.use('/students', cors(), students);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
