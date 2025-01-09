import { pool } from "../database/db.js";
import { handleDatabaseError } from "../error/message.js";


class SalaryHistoryService {
    //crear un nuevo salario historico
    async createSalaryHistory(user_id, previous_salary, new_salary) {
        const [result] = await db.execute(
            'INSERT INTO salary_history (user_id, previous_salary, new_salary) VALUES (?, ?, ?)',
            [user_id, previous_salary, new_salary]
        );
        return result.insertId;
    }
    //obetener los salarios historicos por usuario
    async getSalaryHistoriesByUserId(user_id) {
        try {
            const [rows] = await pool.query('SELECT * FROM salary_history WHERE user_id =?', [user_id])
            return rows
        } catch (error) {
            handleDatabaseError(error)
        }
    }
    //actualizar un salario historico
    async updateSalaryHistory(id, user_id, previous_salary, new_salary) {
        try {
            const [result] = await pool.query('UPDATE salary_history SET previos_salary = ?, new_salary = ? WHERE id = ? AND user_id = ?', [previous_salary, new_salary, id, user_id])
            return result.affectedRows > 0
        } catch (error) {
            handleDatabaseError(error)
        }
    }
    //eliminar salario historico
    async deleteSalaryHistory(id, user_id) {
        try {
            const [result] = await pool.query('DELETE FROM salary_history WHERE id= ? AND user_id= ?', [id, user_id])
            return result.affectedRows > 0
        } catch (error) {
            handleDatabaseError(error)
        }
    }
}

module.exports = new SalaryHistoryService()