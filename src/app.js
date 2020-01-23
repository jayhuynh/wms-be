const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', (req, res) => res.send('INDEX'));

app.use('/users', require('./routes/routers/user'));

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}!`)
);