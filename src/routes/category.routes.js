import { Router } from "express";
import { CategoryController} from "../controller/category.controller.js";

const categoryController = new CategoryController();

const router = Router();

router.post('/categories', categoryController.createCategory)
router.put('/categories', categoryController.editCategory)
router.delete('/categories/:id', categoryController.deleteCategory)
router.get('/categories/:user_id', categoryController.getCategories)

export default router