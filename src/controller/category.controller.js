import { handleError } from "../error/message.js"
import { craeteCategoryByUser, getCategoriesByUser } from "../service/category.service.js"

export async function getCategories(req, res) {
    const { user_id } = req.params
    /*     console.log(req.params)
        console.log(user_id) */
    if (!user_id) {
        return res.status(400).json({ message: 'El ID del usuario es requerido' })
    }
    try {
        const result = await getCategoriesByUser(user_id);
        if (result.length === 0) {
            return res.status(204).json({ message: 'No se encontraron categorias con ese ID de usuario ' })
        }
        return res.json(result)
    } catch (error) {
        handleError(res, error)
    }
}

//crear una categoria 
export async function createCategory(req, res) {
    const { user_id, name, type } = req.body
    if (!user_id || !name || !type) {
        return res.status(400).json({message:'TODOS LOS CAMPOS SON REQUERIDOS'})
    }
    try {
        const result =await craeteCategoryByUser(user_id,name,type);
        return res.status(201).json(result)
    } catch (error) {
        handleError(res,error)
    }
}