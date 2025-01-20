import { Router } from "express";
import { BudgetController } from "../controller/budget.controller.js";

const budgetController = new BudgetController();
const router = Router()
//get
router.get('/budgets/:user_id', budgetController.getBudget)
//post
router.post('/budgets', budgetController.createBudget);
//delte
router.delete('/budgets/:id', budgetController.deleteBudget);
//update
router.put('/budgets/:id', budgetController.updateBudget);

export default router