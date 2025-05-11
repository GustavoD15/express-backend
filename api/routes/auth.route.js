import express from "express";
import { authController } from "../controller/auth.controller.js";

const router = express.Router();

// Rota de Registro
// POST /api/auth/register
router.post("/register", authController.register);

// Rota de Login
// POST /api/auth/login
router.post("/login", authController.login);

export default router;

