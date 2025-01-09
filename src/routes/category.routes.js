import { Router } from "express";
import { createCategory, deleteCategory, editCategory, getCategories } from "../controller/category.controller.js";

const router = Router();

router.post('/categories', createCategory)
router.put('/categories', editCategory)
router.delete('/categories/:id', deleteCategory)
router.get('/categories/:user_id', getCategories)

export default router