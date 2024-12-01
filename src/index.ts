import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import pingRouter from './routes/pingRoute';
import projectRoute from './routes/projectRoute';
import reportRoute from './routes/reportRoute';
import authenticate from './middleware/token';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Morgan for HTTP logs
app.use(morgan('dev'));
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Home Route of the API
app.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		name: 'DPS-expressjs-challenge API',
		version: process.env.npm_package_version || 'unknown',
	});
});
app.use('/project', authenticate, projectRoute);
app.use('/report', authenticate, reportRoute);
// Ping for Health check
app.use('/ping', pingRouter);
