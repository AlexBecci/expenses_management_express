import { Router } from "express";
import { SalaryHistoryController } from '../controller/salary_history.controller.js'

const salaryController = new SalaryHistoryController();
const router = Router();
//get
router.get('/salarys_historics/:user_id', salaryController.getSalaryHistoriesByUserId)
//post
router.post('/salarys_historics', salaryController.createSalaryHistory);
//delete
router.delete('/salarys_historics/:id', salaryController.deleteSalaryHistory)
//put
router.put('/salarys_historics/:id', salaryController.updateSalaryHistory)

export default router