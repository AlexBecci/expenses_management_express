//importamos la clase del servicio
import { handleError } from '../error/message.js';
import { SalaryHistoryService } from '../service/salary_history.service.js'

//creamos la instancia de la clase
const salaryService = new SalaryHistoryService()

//creamos la clase del controlador
export class SalaryHistoryController {
    async createSalaryHistory(req, res) {
        const { user_id, previous_salary, new_salary } = req.body;
        if (!user_id || !previous_salary || !new_salary) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }
        try {
            const id = await salaryService.createSalaryHistory(user_id, previous_salary, new_salary);
            res.status(201).json({ id, message: 'Salario historico creado con exito' })
        } catch (error) {
            handleError(res, error)
        }
    }

    //traer salarios historicos
    async getSalaryHistoriesByUserId(req, res) {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: 'El ID del usuario es requerido' })
        }
        try {
            const salaryHistories = await salaryService.getSalaryHistoriesByUserId(user_id);
            res.json(salaryHistories)
        } catch (error) {
            handleError(res, error)
        }
    }

    //update salarios historicos
    async updateSalaryHistory(req, res) {
        const { id } = req.params;
        const { user_id, previous_salary, new_salary } = req.body;
        if (!user_id || !previous_salary || !new_salary) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }
        try {
            const success = await salaryService.updateSalaryHistory(id, user_id, previous_salary, new_salary);
            if (success) {
                res.status(200).json({ message: 'Salario historico actualizado con exito' })
            } else {
                res.status(404).json({ message: 'No se encontro el salario historico con ese ID' })
            }
        } catch (error) {
            handleError(res, error)
        }
    }

    //delete salarios historicos
    async deleteSalaryHistory(req, res) {
        const { id } = req.params;
        const { user_id } = req.body;
        if (!user_id || !id) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' })
        }
        try {
            const success = await salaryService.deleteSalaryHistory(id, user_id);
            if (success) {
                res.status(200).json({ message: 'Salario historico eliminado con exito' })
            } else {
                res.status(404).json({ message: 'No se encontro el salario historico con ese ID' })
            }
        } catch (error) {
            handleError(res, error)
        }
    }
}
