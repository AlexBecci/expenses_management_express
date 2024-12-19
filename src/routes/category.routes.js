import { Router } from "express";
import { createCategory, getCategories } from "../controller/category.controller.js";

const router = Router();

router.get('/category/:user_id', getCategories)
router.post('/category', createCategory)

export default router