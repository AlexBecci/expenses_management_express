import { pool } from '../database/db.js';
import { handleDatabaseError } from '../error/message.js';

//init de la clase del servicio para un mejor encapsulacion
export class BudgetService {
    async createBudget(user_id, category_id, period, max_amount) {
        try {
            const [result] = await pool.query('INSERT INTO budget (user_id,category_id,period,max_amount) VALUES (?,?,?,?)', [user_id, category_id, period, max_amount]);
            return result.insertId;//retornamos id creado
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //obtener los presupuestos/budget por usuario
    async getBudgets(user_id) {
        try {
            const [rows] = await pool.query('SELECT * FROM budget WHERE user_id = ?', [user_id]);
            return rows
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //editar/actualizar budget
    async updateBudget(id, user_id, category_id, period, max_amount) {
        try {
            const [result] = await pool.query('UPDATE budget SET category_id=?, period=?, max_amount=? WHERE id=? AND user_id=?', [category_id, period, max_amount, id, user_id]);
            return result.affectedRows > 0
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //eliminar budget 
    async deleteBudget(id, user_id) {
        try {
            const [result] = await pool.query('DELETE FROM budget WHERE id= ? AND user_id=?', [id, user_id]);
            return result.affectedRows > 0;
        } catch (error) {
            handleDatabaseError(error)
        }
    }

}

//test/

/* 
SELECT 
    b.category_id, 
    b.period, 
    b.max_amount, 
    COALESCE(SUM(e.amount), 0) AS total_gastos
FROM 
    Budget b
LEFT JOIN 
    Expense e 
ON 
    b.user_id = e.user_id 
    AND b.category_id = e.category_id 
    AND b.period = DATE_FORMAT(e.date, '%Y-%m')
WHERE 
    b.user_id = 1
    AND b.period = '2025-01'
GROUP BY 
    b.category_id;
*/