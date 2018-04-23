import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import passport from 'passport';
import passportConfig from './middlewares/passport';
import userRoutes from './routes/user';
import trackRoutes from './routes/track';
import albumRoutes from './routes/album';

dotenv.config();

mongoose
	.connect(
		`mongodb://ispashkov:${
			process.env.MONGODB_PSWD
		}@cluster0-shard-00-00-tzgob.mongodb.net:27017,cluster0-shard-00-01-tzgob.mongodb.net:27017,cluster0-shard-00-02-tzgob.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`,
		{
			useMongoClient: true
		}
	)
	.on('error', error => console.log('Connection Error!', error));

mongoose.Promise = global.Promise;

const app = express();

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Passport middleware
app.use(passport.initialize());

//Passport config
passportConfig(passport);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.get('/', (req, res) => {
	res.send('Soundify Backend');
});

app.use('/uploads/', express.static(path.join(__dirname, '../uploads/')));
app.use('/user', userRoutes);
app.use('/track', trackRoutes);
app.use('/album', albumRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.json({
		error
	});
});

// handling 404 errors
app.use((err, req, res, next) => {
	if (err.status !== 404) {
		return next();
	}

	if (req.accepts('html')) {
		return res.send(err.message);
	}

	// respond with json
	if (req.accepts('json')) {
		return res.json({ error: err.message });
	}

	// default to plain-text. send()
	res.type('txt').send(err.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
