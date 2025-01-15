import { pool } from "../database/db.js";
import { handleDatabaseError } from "../error/message.js";

export async function getUsersService(req, res) {
    try {
        const [rows] = await pool.query('SELECT * FROM user');
        res.json(rows)
    } catch (error) {
        handleDatabaseError(error)
    }
}

//function que me trae los datos del usuario  por user_id
export async function getUserService(id) {
    try {
        const [rows] = await pool.query("SELECT id,name,email,initial_salary,current_salary,creation_date,updated_at,phone_number FROM user  WHERE id = ?", [id])
        return rows[0]//devolvemos los datos del usuario
    } catch (error) {
        handleDatabaseError(error)
    }
}

//traer usuario por email orientado como validacion
export async function getUserByEmail(email) {
    try {
        const [row] = await pool.query("SELECT * FROM user WHERE email= ?", [email])
        return row
    } catch (error) {
        /* handleError(res, error) */
        handleDatabaseError(error)
    }
}

//funcion que crae el usuario nuevo con la password hasheada
export async function createUserService(email, password, name, phone_number) {
    try {
        const result = await pool.query('INSERT INTO user (email,password,name,phone_number,initial_salary,current_salary) VALUES (?,?,?,?,?,?)', [email, password, name, phone_number, 0, 0]);
        return { id: result.insertId, message: 'Usuario creado con exito' }
    } catch (error) {
        /* handleError(res, error) */
        handleDatabaseError(error)
    }
}
