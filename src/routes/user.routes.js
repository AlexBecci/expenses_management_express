import { Router } from "express";
import { getUsers, getUser } from "../controller/user.controller.js";

const router = Router();
//todos los usuarios
router.get('/users', getUsers)

//usuario uno por uno
router.get('/users/:id',getUser);

export default router