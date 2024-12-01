import express, { Router } from 'express';
import {
	createProject,
	getAllProjects,
	getProjectById,
	updateProject,
	deleteProject,
} from '../controller/projectController';

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: CRUD operations for projects
 */
const projectRoute: Router = express.Router();
// CREATE ROUTE
/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with the provided data.
 *     tags: [Project]
 *     security:
 *       - TokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Project"
 *               description:
 *                 type: string
 *                 example: "Description of the new project"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 */
projectRoute.post('/', createProject);
// READ ROUTE
projectRoute.get('/', getAllProjects);
// READ SPECIFIC PROJECT ROUTE
projectRoute.get('/:id', getProjectById);
// UPDATE SPECIFIC PROJECT ROUTE
projectRoute.put('/:id', updateProject);
// DELETE SPECIFIC PROJECT ROUTE
projectRoute.delete('/:id', deleteProject);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Provide the hardcoded token in the `Authorization` header. The token is `Password123`.
 */
export default projectRoute;
