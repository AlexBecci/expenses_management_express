import { pool } from "../database/db.js";
import { handleDatabaseError } from "../error/message.js";


//init de la clase del servicio
export class CategoryService {
    //traer categorias por usuario
    async getCategoriesByUser(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM category WHERE user_id=?', [id])
            return rows
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //crear categoria por usuario
    async craeteCategoryByUser(user_id, name, type,) {
        try {
            const result = await pool.query('INSERT INTO category (user_id,name,type) VALUES (?,?,?)', [user_id, name, type])
            return { id: result.insertId, message: 'Categoria creada con exito ' }
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //editar categoria
    async editCategoryByUser(id, name, type) {
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
    async deleteCategoryByUser(id) {
        try {
            const result = await pool.query('DELETE FROM category WHERE id=?', [id])
            return { message: 'Categoria eliminada con exito' }
        } catch (error) {
            handleDatabaseError(error)
        }
    }

    //traer categoria por id
    async getCategoryById(id) {
        try {
            const [rows] = await pool.query('SELECT * FROM category WHERE id=?', [id])
            return rows
        } catch (error) {
            handleDatabaseError(error)
        }
    }
}




