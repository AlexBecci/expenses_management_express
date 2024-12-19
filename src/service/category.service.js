import { pool } from "../database/db.js";
import { handleDatabaseError } from "../error/message.js";


//traer categorias por usuario
export async function getCategoriesByUser(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM category WHERE user_id=?', [id])
        return rows
    } catch (error) {
        handleDatabaseError(error)
    }
}

//crear categoria por usuario
export async function craeteCategoryByUser(user_id, name, type,) {
    try {
        const result = await pool.query('INSERT INTO category (user_id,name,type) VALUES (?,?,?)', [user_id, name, type])
        return { id: result.insertId, message: 'Categoria creada con exito ' }
    } catch (error) {
        handleDatabaseError(error)
    }
}

//editar categoria

//eliminar categoria


