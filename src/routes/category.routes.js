import { Router } from "express";
import { createCategory, getCategories } from "../controller/category.controller.js";

const router = Router();

router.get('/categories/:user_id', getCategories)
router.post('/categories', createCategory)

export default router