const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

const app = express();

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    // Pass to next layer of middleware
    next();
});	

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('INDEX'));

app.use('/users', require('./routes/routers/user'));

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}!`)
);