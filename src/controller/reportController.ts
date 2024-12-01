import { Request, Response } from 'express';
import dbService from '../services/db.service';

interface Report {
	id: string;
	text: string;
	project_id: string;
}

interface Project {
	id: string;
	name: string;
	description: string;
}

interface DatabaseResult {
	changes?: number;
}

// Create a Project
export const createReport = async (req: Request, res: Response) => {
	try {
		const { text, project_id }: { text: string; project_id: string } =
			req.body;

		// Validate input
		if (!text || !project_id) {
			return res
				.status(400)
				.json({ error: 'Text and Project ID are required' });
		}

		const projectCheckSQL = 'SELECT id FROM projects WHERE id = ?';
		const projectExists = dbService.query(projectCheckSQL, [
			project_id,
		]) as Project[];

		if (projectExists.length === 0) {
			return res.status(404).json({
				error: `Project with id = ${project_id} not found Check Again`,
			});
		}

		// Fetch the last report ID from the database to account for AUTO-INCREMENT feature in DB
		const fetchlastReportSQL =
			'SELECT id FROM reports ORDER BY id DESC LIMIT 1';
		const lastReport = dbService.query(fetchlastReportSQL) as Report[];

		// Determine the new report ID
		const newId =
			lastReport.length > 0 && lastReport[0].id
				? Number(lastReport[0].id) + 1
				: 1;

		if (isNaN(newId)) {
			throw new Error(
				'Invalid ID value encountered while calculating new ID',
			);
		}

		// Insert the new report into the database
		const insertSQL =
			'INSERT INTO reports (id, text, project_id) VALUES (?, ?, ?)';
		dbService.run(insertSQL, [newId.toString(), text, project_id]);

		res.status(201).json({
			message: 'Project created successfully in the Database',
			id: newId,
			text: text,
			project_id: project_id,
		});
	} catch (error) {
		console.error('Error creating report:', error);
		res.status(500).json({
			error: 'Error creating report',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Get all Reports
export const getAllReports = async (req: Request, res: Response) => {
	try {
		const sql = 'SELECT * FROM reports';
		const reports: unknown[] = dbService.query(sql);
		res.status(200).json({ reports });
	} catch (error) {
		console.error('Error fetching Reports:', error);
		res.status(500).json({
			error: 'Error fetching Reports',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Get a report by ID
export const getReportById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		console.log('test', id);
		// Validate ID
		if (!id) {
			return res.status(400).json({ error: 'report ID is required' });
		}

		const sql = 'SELECT * FROM reports WHERE id = ?';
		const reports: unknown[] = dbService.query(sql, [id]);

		if (reports.length === 0) {
			return res.status(404).json({ message: 'Report not found' });
		}

		res.status(200).json({ report: reports[0] });
	} catch (error) {
		console.error('Error fetching report:', error);
		res.status(500).json({
			error: 'Error fetching report',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Update a report
export const updateReport = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { text, project_id }: Report = req.body;

		// Validate input
		if (!id) {
			return res.status(400).json({ error: 'Report ID is required' });
		}
		if (!text || !project_id) {
			return res
				.status(400)
				.json({ error: 'Name and description are required' });
		}

		const sql = 'UPDATE reports SET name = ?, description = ? WHERE id = ?';

		const result: DatabaseResult = dbService.run(sql, [
			text,
			project_id,
			id,
		]);

		if (result.changes === 0) {
			return res.status(404).json({ message: 'Report not found' });
		}

		res.status(200).json({ message: 'Report updated successfully' });
	} catch (error) {
		console.error('Error updating report:', error);
		res.status(500).json({
			error: 'Error updating report',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Delete a report
export const deleteReport = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// Validate ID
		if (!id) {
			return res.status(400).json({ error: 'Report ID is required' });
		}

		const sql = 'DELETE FROM reports WHERE id = ?';
		const result: DatabaseResult = dbService.run(sql, [id]);

		if (result.changes === 0) {
			return res.status(404).json({ message: 'Report not found' });
		}

		res.status(200).json({ message: 'Report deleted successfully' });
	} catch (error) {
		console.error('Error deleting report:', error);
		res.status(500).json({
			error: 'Error deleting report',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

export default {
	createReport,
	getAllReports,
	getReportById,
	updateReport,
	deleteReport,
};
