import { Request, Response, NextFunction } from 'express';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];
	if (!token) {
		return res.status(401).json({ error: 'Auth Header Token Required' });
	}
	const tokenValue = process.env.AUTH_TOKEN_VALUE || 'Password123';
	// Check if the token exists and matches the expected HARDCODE value
	// Not the Best Practice :-(
	if (token === tokenValue) {
		return next();
	}

	return res.status(401).json({ error: 'Unauthorized access, check Token' });
};

export default authenticate;
