// ./app.js
const express = require('express')
const bodyParser = require('body-parser');
const PORT = 3000;
const mountRoutes = require('./routes')

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
mountRoutes(app);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));