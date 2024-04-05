// Import the dotenv library to load environment variables
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from the .env file

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Importing route modules
const db = require('./database'); // Assuming this sets up your database connection
const contacts = require('./routes/contacts');
const events = require('./routes/events');
const home = require('./routes/home');
const students = require('./routes/students');
const societies = require('./routes/societies'); // Ensure you have this route module set up

// Setting up CORS
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

// Using route modules
app.use('/api/v1/contacts/', contacts);
app.use('/api/v1/events/', events);
app.use('/', home);
app.use('/api/v1/students', students);
app.use('/api/v1/societies', societies); // Include societies in the API

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
