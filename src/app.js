const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;
// Add headers
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => res.send('INDEX'));

app.use('/users', require('./routes/routers/user'));

const faker = require('faker/locale/vi')
faker.seed(123);

var firstRandom = faker.name.firstName();
firstRandom = faker.name.firstName();
// Setting the seed again resets the sequence.
faker.seed(123);
var secondRandom = faker.name.firstName();
console.log(firstRandom, secondRandom);

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}!`)
);