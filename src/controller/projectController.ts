import { Request, Response } from 'express';
import dbService from '../services/db.service';

interface Project {
	id: string;
	name: string;
	description: string;
}

interface DatabaseResult {
	changes?: number;
}

// Create a Project
export const createProject = async (req: Request, res: Response) => {
	try {
		const { name, description }: { name: string; description: string } =
			req.body;

		// Validate input
		if (!name || !description) {
			return res
				.status(400)
				.json({ error: 'Name and description are required' });
		}

		// Fetch the last project ID from the database to account for AUTO-INCREMENT feature in DB
		const fetchLastProjectSQL =
			'SELECT id FROM projects ORDER BY id DESC LIMIT 1';
		const lastProject = dbService.query(fetchLastProjectSQL) as Project[];

		// Determine the new project ID
		const newId =
			lastProject.length > 0 && lastProject[0].id
				? Number(lastProject[0].id) + 1
				: 1;

		if (isNaN(newId)) {
			throw new Error(
				'Invalid ID value encountered while calculating new ID',
			);
		}

		// Insert the new project into the database
		const insertSQL =
			'INSERT INTO projects (id, name, description) VALUES (?, ?, ?)';
		dbService.run(insertSQL, [newId.toString(), name, description]);

		res.status(201).json({
			message: 'Project created successfully in the Database',
			id: newId,
			name: name,
			discription: description,
		});
	} catch (error) {
		console.error('Error creating project:', error);
		res.status(500).json({
			error: 'Error creating project',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
	try {
		const sql = 'SELECT * FROM projects';
		const projects: unknown[] = dbService.query(sql);
		res.status(200).json({ projects });
	} catch (error) {
		console.error('Error fetching projects:', error);
		res.status(500).json({
			error: 'Error fetching projects',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Get a project by ID
export const getProjectById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		console.log('test', id);
		// Validate ID
		if (!id) {
			return res.status(400).json({ error: 'Project ID is required' });
		}

		const sql = 'SELECT * FROM projects WHERE id = ?';
		const projects: unknown[] = dbService.query(sql, [id]);

		if (projects.length === 0) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.status(200).json({ project: projects[0] });
	} catch (error) {
		console.error('Error fetching project:', error);
		res.status(500).json({
			error: 'Error fetching project',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, description }: Project = req.body;

		// Validate input
		if (!id) {
			return res.status(400).json({ error: 'Project ID is required' });
		}
		if (!name || !description) {
			return res
				.status(400)
				.json({ error: 'Name and description are required' });
		}

		const sql =
			'UPDATE projects SET name = ?, description = ? WHERE id = ?';

		const result: DatabaseResult = dbService.run(sql, [
			name,
			description,
			id,
		]);

		if (result.changes === 0) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.status(200).json({ message: 'Project updated successfully' });
	} catch (error) {
		console.error('Error updating project:', error);
		res.status(500).json({
			error: 'Error updating project',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// Validate ID
		if (!id) {
			return res.status(400).json({ error: 'Project ID is required' });
		}

		const sql = 'DELETE FROM projects WHERE id = ?';
		const result: DatabaseResult = dbService.run(sql, [id]);

		if (result.changes === 0) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.status(200).json({ message: 'Project deleted successfully' });
	} catch (error) {
		console.error('Error deleting project:', error);
		res.status(500).json({
			error: 'Error deleting project',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

export default {
	createProject,
	getAllProjects,
	getProjectById,
	updateProject,
	deleteProject,
};
