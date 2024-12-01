import express, { Request, Response, Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Ping
 *   description: Health check endpoint
 */

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a simple 'pong' response to verify the API is running
 *     tags: [Ping]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */
const pingRouter: Router = express.Router();

pingRouter.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		message: 'pong',
	});
});

export default pingRouter;
