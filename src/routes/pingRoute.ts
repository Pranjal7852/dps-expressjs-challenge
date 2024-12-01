import express, { Request, Response, Router } from 'express';

const pingRouter: Router = express.Router();

pingRouter.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		message: 'pong',
	});
});

export { pingRouter };
