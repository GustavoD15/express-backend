import express from "express";
import { taskController } from "../controller/task.controller.js";
import verifyToken from "../middleware/jwt.token.js"; // Middleware de autenticação JWT

const router = express.Router();

// Todas as rotas de tarefas são protegidas e requerem um token JWT válido
router.use(verifyToken);

// POST /api/tasks - Criar uma nova tarefa
router.post("/", taskController.createTask);

// GET /api/tasks - Listar todas as tarefas do usuário autenticado
router.get("/", taskController.getTasks);

// GET /api/tasks/:id - Obter detalhes de uma tarefa específica do usuário autenticado
router.get("/:id", taskController.getTaskById);

// PUT /api/tasks/:id - Atualizar todos os dados de uma tarefa específica do usuário autenticado
router.put("/:id", taskController.updateTask);

// PATCH /api/tasks/:id - Atualizar parcialmente uma tarefa específica do usuário autenticado
router.patch("/:id", taskController.patchTask);

// DELETE /api/tasks/:id - Remover uma tarefa específica do usuário autenticado
router.delete("/:id", taskController.deleteTask);

export default router;

