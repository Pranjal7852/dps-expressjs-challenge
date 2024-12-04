import express, { Router } from 'express';
import {
	createReport,
	getAllReports,
	getReportById,
	updateReport,
	deleteReport,
	getReportsByProjectId,
} from '../controller/reportController';

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: CRUD operations for reports
 */
const reportRoute: Router = express.Router();
// READ ROUTE
/**
 * @swagger
 * /report:
 *   get:
 *     summary: Get all reports
 *     description: Retrieves all reports from the database.
 *     operationId: getAllReports
 *     tags:
 *       - Report
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched all reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "101"
 *                       text:
 *                         type: string
 *                         example: "Report content"
 *                       projectid:
 *                         type: string
 *                         example: "123"
 *       '500':
 *         description: Error fetching reports
 */
reportRoute.get('/', getAllReports);
// CREATE ROUTE
/**
 * @swagger
 * /report:
 *   post:
 *     summary: Create a new report
 *     description: Creates a new report associated with a project.
 *     operationId: createReport
 *     tags:
 *       - Report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the report
 *                 example: "Report content"
 *               project_id:
 *                 type: string
 *                 description: The ID of the project associated with the report
 *                 example: "123"
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       '201':
 *         description: Successfully created the report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report created successfully in the Database"
 *                 id:
 *                   type: string
 *                   example: "101"
 *                 text:
 *                   type: string
 *                   example: "Report content"
 *                 project_id:
 *                   type: string
 *                   example: "123"
 *       '400':
 *         description: Text and Project ID are required
 *       '404':
 *         description: Project not found
 */
reportRoute.post('/', createReport);
// READ SPECIFIC REPORT ROUTE
/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Get report by ID
 *     description: Retrieves a single report based on its ID.
 *     operationId: getReportById
 *     tags:
 *       - Report
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the report
 *         schema:
 *           type: string
 *           example: "101"
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched the report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 report:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "101"
 *                     text:
 *                       type: string
 *                       example: "Report content"
 *                     projectid:
 *                       type: string
 *                       example: "123"
 *       '400':
 *         description: Report ID is required
 *       '404':
 *         description: Report not found
 *       '500':
 *         description: Error fetching the report
 */
reportRoute.get('/:id', getReportById);
// READ ALL REPORT BASED ON PROJECT ID
/**
 * @swagger
 * /report/project/{project_id}:
 *   get:
 *     summary: Get reports by project ID
 *     description: Fetch all reports associated with the given project ID.
 *     tags:
 *       - Report
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to fetch reports for.
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the report.
 *                       text:
 *                         type: string
 *                         description: The text content of the report.
 *                       projectid:
 *                         type: string
 *                         description: The ID of the project associated with the report.
 *       404:
 *         description: No reports found for the given project ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'No reports found for {project_id} project ID'
 *       500:
 *         description: Internal server error due to unexpected issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error fetching reports'
 *                 details:
 *                   type: string
 *                   example: 'Unknown error'
 */
reportRoute.get('/project/:project_id', getReportsByProjectId);
// UPDATE SPECIFIC REPORT ROUTE
/**
 * @swagger
 * /report/{id}:
 *   patch:
 *     summary: Update a report
 *     description: Update an existing report with the provided text and project_id. Either `text` or `project_id` must be provided. If `project_id` is provided, it must exist.
 *     tags:
 *       - Report
 *     security:
 *       - TokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text content of the report.
 *               project_id:
 *                 type: string
 *                 description: The ID of the project associated with the report.
 *     responses:
 *       200:
 *         description: Report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Report updated successfully'
 *       400:
 *         description: Bad request due to missing required fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'At least one field (text or project_id) is required'
 *       404:
 *         description: Report not found or project with the provided `project_id` does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Project with ID {project_id} not found. Try again!'
 *       500:
 *         description: Internal server error due to unexpected issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error updating report'
 *                 details:
 *                   type: string
 *                   example: 'Unknown error'
 */
reportRoute.patch('/:id', updateReport);
// DELETE SPECIFIC REPORT ROUTE
/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: Delete a report
 *     description: Deletes a report by its ID.
 *     operationId: deleteReport
 *     tags:
 *       - Report
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the report to be deleted
 *         schema:
 *           type: string
 *           example: "101"
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       '200':
 *         description: Successfully deleted the report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report deleted successfully"
 *       '400':
 *         description: Report ID is required
 *       '404':
 *         description: Report not found
 *       '500':
 *         description: Error deleting the report
 */
reportRoute.delete('/:id', deleteReport);

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
export default reportRoute;
