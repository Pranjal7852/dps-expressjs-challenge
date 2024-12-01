import sqlite from 'better-sqlite3';
import path from 'path';

const db = new sqlite(path.resolve('./db/db.sqlite3'), {
	fileMustExist: true,
});

// Changed the param type from object to Array to match with SQlite syntax that needs an Array
function query(sql: string, params?: (string | number | undefined)[]) {
	return params ? db.prepare(sql).all(params) : db.prepare(sql).all();
}
// Changed the param type from object to Array to match with SQlite syntax that needs an Array
function run(sql: string, params?: (string | number | undefined)[]) {
	return params ? db.prepare(sql).run(params) : db.prepare(sql).run();
}

export default { query, run };
