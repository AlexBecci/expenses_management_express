import { Router } from "express";
import { createTransaction, getTransactions } from "../controller/transaction.controller.js";

const router = Router();

router.get('/transactions', getTransactions)
router.post('/transactions', createTransaction)

export default router