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

// READ ROUTE
/**
 * @swagger
 * /project:
 *   get:
 *     summary: Get all projects
 *     description: Retrieves a list of all projects from the database.
 *     tags: [Project]
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: A list of all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Project Alpha"
 *                       description:
 *                         type: string
 *                         example: "This is the first project."
 *       500:
 *         description: Internal Server Error. Something went wrong while fetching the projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching projects"
 *                 details:
 *                   type: string
 *                   example: "Database connection error"
 */
projectRoute.get('/', getAllProjects);
// CREATE ROUTE
/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with the provided name and description and returns the newly created project's ID.
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
 *                 example: "This is a description of the new project."
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
 *                   example: "Project created successfully in the Database"
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "New Project"
 *                 description:
 *                   type: string
 *                   example: "This is a description of the new project."
 *       400:
 *         description: Bad Request. Name and description are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and description are required"
 *       500:
 *         description: Internal Server Error. Something went wrong while creating the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating project"
 *                 details:
 *                   type: string
 *                   example: "Invalid ID value encountered while calculating new ID"
 */
projectRoute.post('/', createProject);
// READ SPECIFIC PROJECT ROUTE
/**
 * @swagger
 * /project/id/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieves the details of a specific project by its ID.
 *     tags: [Project]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Project details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Project Alpha"
 *                     description:
 *                       type: string
 *                       example: "This is the first project."
 *       400:
 *         description: Bad Request. Project ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project ID is required"
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project not found"
 *       500:
 *         description: Internal Server Error. Something went wrong while fetching the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching project"
 *                 details:
 *                   type: string
 *                   example: "Database connection error"
 */
projectRoute.get('id/:id', getProjectById);
// UPDATE SPECIFIC PROJECT ROUTE
/**
 * @swagger
 * /project/{id}:
 *   patch:
 *     summary: Update a project
 *     description: Updates the details of a specific project by its ID.
 *     tags: [Project]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Project Name"
 *               description:
 *                 type: string
 *                 example: "Updated description of the project."
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project updated successfully"
 *       400:
 *         description: Bad Request. Project ID, name, and description are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and description are required"
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project not found"
 *       500:
 *         description: Internal Server Error. Something went wrong while updating the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating project"
 *                 details:
 *                   type: string
 *                   example: "Database connection error"
 */
projectRoute.patch('/:id', updateProject);
// DELETE SPECIFIC PROJECT ROUTE
/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Deletes a specific project by its ID.
 *     tags: [Project]
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the project to delete.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project deleted successfully"
 *       400:
 *         description: Bad Request. Project ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project ID is required"
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project not found"
 *       500:
 *         description: Internal Server Error. Something went wrong while deleting the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting project"
 *                 details:
 *                   type: string
 *                   example: "Database connection error"
 */
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
