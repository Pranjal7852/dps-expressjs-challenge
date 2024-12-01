import express, { Router } from 'express';
import {
	createProject,
	getAllProjects,
	getProjectById,
	updateProject,
	deleteProject,
} from '../controller/projectController';

const projectRoute: Router = express.Router();
// CREATE ROUTE
projectRoute.post('/', createProject);
// READ ROUTE
projectRoute.get('/', getAllProjects);
// READ SPECIFIC PROJECT ROUTE
projectRoute.get('/:id', getProjectById);
// UPDATE SPECIFIC PROJECT ROUTE
projectRoute.put('/:id', updateProject);
// DELETE SPECIFIC PROJECT ROUTE
projectRoute.delete('/:id', deleteProject);

export default projectRoute;
