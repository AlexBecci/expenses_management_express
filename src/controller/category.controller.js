import { handleError } from "../error/message.js"
import { CategoryService } from "../service/category.service.js"

//creamos una instancia de la clase
const categoryService = new CategoryService();

//creamos la clase del controlador
export class CategoryController {
    async getCategories(req, res) {
        const { user_id } = req.params
        if (!user_id) {
            return res.status(400).json({ message: 'El ID del usuario es requerido' })
        }
        try {
            const result = await categoryService.getCategoriesByUser(user_id);
            if (result.length === 0) {
                return res.status(204).json({ message: 'No se encontraron categorias con ese ID de usuario ' })
            }
            return res.json(result)
        } catch (error) {
            handleError(res, error)
        }
    }

    //crear una categoria 
    async createCategory(req, res) {
        const { user_id, name, type } = req.body
        if (!user_id || !name || !type) {
            return res.status(400).json({ message: 'TODOS LOS CAMPOS SON REQUERIDOS' })
        }
        try {
            const result = await categoryService.craeteCategoryByUser(user_id, name, type);
            return res.status(201).json(result)
        } catch (error) {
            handleError(res, error)
        }
    }

    //eliminar una categoria
    async deleteCategory(req, res) {
        try {
            console.log(req.params)
            const { id } = req.params
            //validar que id existe 
            if (!id) {
                return res.status(400).json({ message: 'El ID del usuario es requerido' })
            }
            //buscar si existe la categoria
            const category = await categoryService.getCategoryById(id);
            if (category.length === 0) {
                return res.status(404).json({ message: 'No se encontro la categoria con ese ID' })
            }
            //llamar a la funcion de eliminar categoria
            const result = await categoryService.deleteCategoryByUser(id);
            //enviar respuesta
            return res.status(200).json(result)
        } catch (error) {
            console.error(error)
            //manejar errores
            handleError(res, error)
        }
    }

    //editar una categoria
    async editCategory(req, res) {
        const { id, name, type } = req.body
        if (!id || !name || !type) {
            return res.status(400).json({ message: 'TODOS LOS CAMPOS SON REQUERIDOS' })
        }
        //buscar si existe la categoria
        const category = await categoryService.getCategoryById(id);
        if (category.length === 0) {
            return res.status(404).json({ message: 'No se encontro la categoria con ese ID' })
        }
        try {
            const result = await categoryService.editCategoryByUser(id, name, type);
            return res.status(200).json(result)
        } catch (error) {
            handleError(res, error)
        }
    }
}