import express, { Router } from 'express';
import {
	createReport,
	getAllReports,
	getReportById,
	updateReport,
	deleteReport,
	getReportsByProjectId,
} from '../controller/reportController';

const reportRoute: Router = express.Router();
// CREATE ROUTE
reportRoute.post('/', createReport);
// READ ROUTE
reportRoute.get('/', getAllReports);
// READ SPECIFIC REPORT ROUTE
reportRoute.get('/:id', getReportById);

// READ SPECIFIC REPORT ROUTE
reportRoute.get('/project/:project_id', getReportsByProjectId);

// UPDATE SPECIFIC REPORT ROUTE
reportRoute.put('/:id', updateReport);
// DELETE SPECIFIC REPORT ROUTE
reportRoute.delete('/:id', deleteReport);

export default reportRoute;
