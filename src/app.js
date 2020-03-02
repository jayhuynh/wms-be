const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

const app = express();

// Add headers
app.use(cors({
    origin: ALLOW_ORIGIN,
    methods: ['GET, POST, PATCH, DELETE'],
    allowedHeaders: ['X-Requested-With', 'Content-Type']
}));

app.get('/', (req, res) => res.send('INDEX'));

app.use('/users', require('./routes/routers/user'));

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}!`)
);