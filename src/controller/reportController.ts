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

// This Function helps in treating project_id as a FOREIGN KEY
function checkIfProjectExist(project_id: string): boolean {
	const projectCheckSQL = 'SELECT id FROM projects WHERE id = ?';
	const projectExists = dbService.query(projectCheckSQL, [
		project_id,
	]) as Project[];
	return projectExists.length > 0;
}
// Create a Report
export const createReport = async (req: Request, res: Response) => {
	try {
		const { text, project_id }: { text: string; project_id: string } =
			req.body;

		if (!text || !project_id) {
			return res
				.status(400)
				.json({ error: 'Text and Project ID are required' });
		}

		if (!checkIfProjectExist(project_id)) {
			return res.status(404).json({
				error: `Project with ${project_id} id not found, Try Again!`,
			});
		}

		// Fetch the last report ID from the database to account for AUTO-INCREMENT feature in DB
		const fetchlastReportSQL =
			'SELECT id FROM reports ORDER BY id DESC LIMIT 1';
		const lastReport = dbService.query(fetchlastReportSQL) as Report[];

		const newId =
			lastReport.length > 0 && lastReport[0].id
				? Number(lastReport[0].id) + 1
				: 1;

		if (isNaN(newId)) {
			throw new Error(
				'Invalid ID value encountered while calculating new ID',
			);
		}

		const insertSQL =
			'INSERT INTO reports (id, text, projectid) VALUES (?, ?, ?)';
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

// Get all Reports with the same Prokject ID
export const getReportsByProjectId = async (req: Request, res: Response) => {
	try {
		let { project_id } = req.params;
		project_id = String(project_id);

		const fetchReportsSQL = 'SELECT * FROM reports WHERE projectid = ?';
		const reports = dbService.query(fetchReportsSQL, [
			project_id,
		]) as Report[];

		if (reports.length === 0) {
			return res.status(404).json({
				message: `No reports found for ${project_id} project ID`,
			});
		}

		res.status(200).json({ reports });
	} catch (error) {
		console.error('Error fetching reports:', error);
		res.status(500).json({
			error: 'Error fetching reports',
			details: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};

// Get a report by ID
export const getReportById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
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

		if (!id) {
			return res.status(400).json({ error: 'Report ID is required' });
		}
		if (!text || !project_id) {
			return res
				.status(400)
				.json({ error: 'text and project_id are required' });
		}

		if (!checkIfProjectExist(project_id)) {
			return res.status(404).json({
				error: `Project with ${project_id} id not found, Try Again!`,
			});
		}

		const sql = 'UPDATE reports SET text = ?, projectid = ? WHERE id = ?';

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

		if (!id) {
			return res.status(400).json({ error: 'Report ID is required' });
		}
		console.log('test', id);
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
	getReportsByProjectId,
};