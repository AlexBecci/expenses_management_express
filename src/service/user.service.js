import { pool } from "../database/db.js";
import { handleError } from "../error/message.js";

export async function getUsersService(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM user');
        res.json(rows)
    } catch (error) {
        handleError(res, error, 'Error al obtener los usuarios')
    }
}