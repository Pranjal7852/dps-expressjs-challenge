import express, { Router } from 'express';
import {
	createReport,
	getAllReports,
	getReportById,
	updateReport,
	deleteReport,
} from '../controller/reportController';

const reportRoute: Router = express.Router();
// CREATE ROUTE
reportRoute.post('/', createReport);
// READ ROUTE
reportRoute.get('/', getAllReports);
// READ SPECIFIC PROJECT ROUTE
reportRoute.get('/:id', getReportById);
// UPDATE SPECIFIC PROJECT ROUTE
reportRoute.put('/:id', updateReport);
// DELETE SPECIFIC PROJECT ROUTE
reportRoute.delete('/:id', deleteReport);

export default reportRoute;
