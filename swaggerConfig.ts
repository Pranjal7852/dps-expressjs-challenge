import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'DPS-expressjs-challenge API',
			version: process.env.npm_package_version || '1.0',
			description: 'API documentation for DPS-expressjs-challenge API',
			contact: {
				name: 'Pranjal Goyal',
				url: 'https://github.com/pranjal7852',
				email: 'pranjal7852@gmail.com',
			},
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3001}`,
				description: 'Local server',
			},
		],
		securityDefinitions: {
			ApiKeyAuth: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization',
				description: 'Enter your token in the format: Password123',
			},
		},
		security: [
			{
				ApiKeyAuth: [],
			},
		],
	},
	apis: ['./src/routes/*.ts', './src/controller/*.ts'], // Path to your API routes for Swagger to extract documentation
};
