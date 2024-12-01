import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { pingRouter } from './routes/pingRoute';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Home Route of the API
app.use('/', (req: Request, res: Response) => {
	res.status(200).json({
		name: 'DPS-expressjs-challenge API',
		version: process.env.npm_package_version || 'unknown',
	});
});

// Ping for Health check
app.use('/ping', pingRouter);
