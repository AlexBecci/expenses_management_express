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

//traer transaccion por id transaccion
export async function getTransactionById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM transaction WHERE id=?', [id])
        return rows
    } catch (error) {
        handleDatabaseError(error)
    }
}


/* TIPO DE OBJETO QUE SE ESPERA 
{
  "user_id": 1,
  "date": "2024-12-01",
  "amount": 1000.00,
  "type": "income",
  "description": "Monthly salary",
  "category_id": 1,
  "period": "2024-12"
}

*/
//crear una transaccion
export async function createTransactionService(user_id, date, amount, type, description, category_id, period) {
    try {
        const [result] = await pool.query('INSERT INTO transaction (user_id,date,amount,type,description,category_id,period) VALUES (?,?,?,?,?,?,?)', [user_id, date, amount, type, description, category_id, period])
        return result

    } catch (error) {
        handleDatabaseError(error)
    }
}