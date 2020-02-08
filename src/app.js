const PORT = process.env.PORT;
const app = express();	const app = express();

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;
// Add headers
app.use((req, res, next) => {	app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");	
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    // Pass to next layer of middleware
    next();	    next();
});	});

app.get('/', (req, res) => res.send('INDEX'));

app.use('/users', require('./routes/routers/user'));

app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}!`)
);