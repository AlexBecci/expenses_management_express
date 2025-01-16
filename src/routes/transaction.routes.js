import { Router } from "express";
import { createTransaction, getBalanceAll, getTransactions } from "../controller/transaction.controller.js";

const router = Router();

router.get('/transactions', getTransactions)
router.post('/transactions', createTransaction)
//traer balance de las transaccinoes
router.get('/transactions/balance', getBalanceAll)

export default router