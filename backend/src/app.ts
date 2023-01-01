import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

import sequelize from 'databases';
import 'databases/models';
import router from 'api';
import { FacilityModel } from 'databases/models/Facility';

declare global {
	namespace Express {
		interface Request {
			facility: FacilityModel;
		}
	}
}

const app = express();

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

const init = async () => {
	await sequelize.sync();
	console.log('Finish load database.');

	app.use(cookieParser());

	app.use(cors(corsOptions));

	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(bodyParser.json());

	const { xss } = require('express-xss-sanitizer');
	app.use(xss());

	app.use('/api', router);

	// app.use(express.static('build'));

	// app.get('/*', function (req, res) {
	// 	res.sendFile('build/index.html', { root: '.' });
	// });
};

init();

export default app;
