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
export async function editCategoryByUser(id, name, type) {
    try {
        const [result] = await pool.query('UPDATE category SET name=?, type=? WHERE id=?', [name, type, id])
        // Validar si se realizó alguna actualización
        if (result.affectedRows === 0) {
            return null; // No se realizó ningún cambio
        }
        return { message: 'Categoria editada con exito' }
    } catch (error) {
        handleDatabaseError(error)
}
    }

//eliminar categoria
export async function deleteCategoryByUser(id) {
    try {
        const result = await pool.query('DELETE FROM category WHERE id=?', [id])
        return { message: 'Categoria eliminada con exito' }
    } catch (error) {
        handleDatabaseError(error)
    }
}

//traer categoria por id
export async function getCategoryById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM category WHERE id=?', [id])
        return rows
    } catch (error) {
        handleDatabaseError(error)
    }
}


