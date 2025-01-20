//importamos la clase y el error handler
import { handleError } from "../error/message.js";
import { validateFields } from "../helpers/validation.js";
import { BudgetService } from "../service/budget.service.js";

//creamos una instancia de la clase
const budgetService = new BudgetService();

//craemos la clase del controlador

export class BudgetController {
    async createBudget(req, res) {
        if (!user_id || !category_id || !period || !max_amount) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }
        const requiredFields = ['user_id', 'category_id', 'period', 'max_amount'];
        //validar campos 
        if (!validateFields(requiredFields, req.body, res)) return;

        try {
            const { user_id, category_id, period, max_amount } = req.body;
            const id = await budgetService.createBudget(user_id, category_id, period, max_amount);
            res.status(201).json({ id, message: 'Presupuesto creado con exito' })
        } catch (error) {
            handleError(res, error)
        }
    }

    //traer presupuesto por id de usuario
    async getBudget(req, res) {
        const requiredFields = ['user_id']
        //validar campos
        if (!validateFields(requiredFields, req.params, res)) return;
        try {
            const { user_id } = req.params;
            const budgets = await budgetService.getBudgets(user_id);
            res.json(budgets)
        } catch (error) {
            handleError(res, error)
        }
    }
    
    //upadte de budgets/presupuestos
    async updateBudget(req, res) {
        //id, user_id, category_id, period, max_amount
        const { id } = req.params;
        const requiredFields = ['user_id', 'category_id', 'period', 'max_amount'];
        //validar campos
        if (!validateFields(requiredFields, req.body, res)) return;
        try {
            const { user_id, category_id, period, max_amount } = req.body;
            const success = await budgetService.updateBudget(id, user_id, category_id, period, max_amount);
            if (success) {
                res.status(200).json({ message: 'Presupuesto actualizado con exito' })
            }
            else {
                res.status(404).json({ message: 'No se encontro el presupuesto con ese ID' })
            }
        }
        catch (error) {
            handleError(res, error)
        }
    }

    //eliminar presupuestos/budget
    async deleteBudget(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }
        const requiredFields = ['user_id'];
        //validar campos
        if (!validateFields(requiredFields, req.body, res)) return
        try {
            const { user_id } = req.body;
            const success = await budgetService.deleteBudget(id, user_id)
            if (success) {
                res.status(200).json({ message: 'Presupuesto eliminado con exito' })
            } else {
                res.status(404).json({ message: 'No se encontro el presupuesto con ese ID' })
            }
        } catch (error) {
            handleError(res, error)
        }
    }
}