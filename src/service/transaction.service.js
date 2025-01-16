import { pool } from "../database/db.js";
import { handleDatabaseError } from "../error/message.js";

//traer transacciones(multiples) por id_usuario
export async function getTransactionsByUser(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM transaction WHERE user_id=?', [id])
        return rows
    } catch (error) {
        handleDatabaseError(error)
    }
}

/* 
export async function getTransactionsByUser(id, limit = null) {
    try {
        let query = 'SELECT * FROM transaction WHERE user_id=?';
        const params = [id];

        // Si se especifica un límite, ajustamos la consulta
        if (limit !== null) {
            query += ' LIMIT ?';
            params.push(limit);
        }

        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        handleDatabaseError(error);
    }
}
*/

//traer transaccion por id transaccion
export async function getTransactionById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM transaction WHERE id=?', [id])
        return rows
    } catch (error) {
        handleDatabaseError(error)
    }
}

//traer balance por meses
export async function getMonthlyBalanceByUser(id) {
    try {
        const [rows] = await pool.query(` SELECT
             DATE_FORMAT(date, '%Y-%m') AS month,
             type,
             SUM(CAST(amount AS DECIMAL(10,2))) AS total
             FROM
             transaction
             WHERE
             user_id= ?
             GROUP BY month, type
             ORDER BY month ASC;
             `, [id])
        //organizar datos por mes en un formato legible esto puede ser opcional
        const result = rows.reduce((acc, row) => {
            if (!acc[row.month]) {
                acc[row.month] = { income: 0, expense: 0 }
            }
            acc[row.month][row.type] = row.total;
            return acc
        }, {});
        return result
    } catch (error) {
        handleDatabaseError(error)
    }
}
//crear una transaccion
export async function createTransactionService(user_id, date, amount, type, description, category_id, period) {
    try {
        const [result] = await pool.query('INSERT INTO transaction (user_id,date,amount,type,description,category_id,period) VALUES (?,?,?,?,?,?,?)', [user_id, date, amount, type, description, category_id, period])
        return result

    } catch (error) {
        handleDatabaseError(error)
    }
}