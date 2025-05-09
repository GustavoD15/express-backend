import { taskService } from "../services/task.service.js";

export const taskController = {
    async createTask(req, res, next) {
        try {
            const userId = req.user.id; 
            console.log(`[TaskController] Received request to create task for user: ${userId}`);
            const task = await taskService.createTask(req.body, userId);
            console.log(`[TaskController] Task created successfully: ${task._id} for user: ${userId}`);
            res.status(201).json({ message: "Tarefa criada com sucesso!", task });
        } catch (error) {
            console.error(`[TaskController] Error creating task:`, error.message || error);
            next(error);
        }
    },

    async getTasks(req, res, next) {
        try {
            const userId = req.user.id; 
            console.log(`[TaskController] Received request to get tasks for user: ${userId}`);
            const tasks = await taskService.getTasksByUserId(userId);
            console.log(`[TaskController] Successfully retrieved ${tasks.length} tasks for user: ${userId}`);
            res.status(200).json(tasks);
        } catch (error) {
            console.error(`[TaskController] Error getting tasks:`, error.message || error);
            next(error);
        }
    },

    async getTaskById(req, res, next) {
        try {
            const userId = req.user.id;
            const taskId = req.params.id;
            console.log(`[TaskController] Received request to get task ${taskId} for user: ${userId}`);
            const task = await taskService.getTaskByIdAndUserId(taskId, userId);
            console.log(`[TaskController] Successfully retrieved task ${taskId} for user: ${userId}`);
            res.status(200).json(task);
        } catch (error) {
            console.error(`[TaskController] Error getting task by ID:`, error.message || error);
            next(error);
        }
    },

    async updateTask(req, res, next) {
        try {
            const userId = req.user.id; 
            const taskId = req.params.id;
            console.log(`[TaskController] Received request to update task ${taskId} for user: ${userId}`);
            const updatedTask = await taskService.updateTaskByIdAndUserId(taskId, req.body, userId, false);
            console.log(`[TaskController] Successfully updated task ${taskId} for user: ${userId}`);
            res.status(200).json({ message: "Tarefa atualizada com sucesso!", task: updatedTask });
        } catch (error) {
            console.error(`[TaskController] Error updating task:`, error.message || error);
            next(error);
        }
    },

    async patchTask(req, res, next) {
        try {
            const userId = req.user.id; 
            const taskId = req.params.id;
            console.log(`[TaskController] Received request to partially update task ${taskId} for user: ${userId}`);
            const updatedTask = await taskService.updateTaskByIdAndUserId(taskId, req.body, userId, true);
            console.log(`[TaskController] Successfully partially updated task ${taskId} for user: ${userId}`);
            res.status(200).json({ message: "Tarefa atualizada parcialmente com sucesso!", task: updatedTask });
        } catch (error) {
            console.error(`[TaskController] Error partially updating task:`, error.message || error);
            next(error);
        }
    },

    async deleteTask(req, res, next) {
        try {
            const userId = req.user.id; 
            const taskId = req.params.id;
            console.log(`[TaskController] Received request to delete task ${taskId} for user: ${userId}`);
            await taskService.deleteTaskByIdAndUserId(taskId, userId);
            console.log(`[TaskController] Successfully deleted task ${taskId} for user: ${userId}`);
            res.status(200).json({ message: "Tarefa removida com sucesso." }); 
        } catch (error) {
            console.error(`[TaskController] Error deleting task:`, error.message || error);
            next(error);
        }
    }
};

