import { Router } from "express";
import { TransactionController } from "../controller/transaction.controller.js";

//importamos instancia del controlador referido
const transactionController = new TransactionController();
const router = Router();

router.get('/transactions', transactionController.getTransactions)
router.post('/transactions', transactionController.createTransaction)
//traer balance de las transaccinoes
router.get('/transactions/balance', transactionController.getBalanceAll)

export default router