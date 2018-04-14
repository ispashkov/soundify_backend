import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import trackRoutes from './routes/track';
import albumRoutes from './routes/album';

dotenv.config();

const PORT = process.env.PORT || 8080;

mongoose
	.connect(
		`mongodb://${process.env.MONGODB_USER}:${
			process.env.MONGODB_PSWD
		}@ds239029.mlab.com:39029/soundify`,
		{
			useMongoClient: true
		}
	)
	.once('open', () => {
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
	})
	.on('error', error => console.log('Connection Error!', error));

mongoose.Promise = global.Promise;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

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
		error: {
			message: error.message
		}
	});
});
