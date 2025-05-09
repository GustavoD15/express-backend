import Task from "../models/Task.js";
import mongoose from "mongoose";

export const taskService = {
    async createTask(taskData, userId) {
        console.log(`[TaskService] Attempting to create task for user: ${userId}`);
        try {
            const task = new Task({
                ...taskData,
                userId
            });
            const savedTask = await task.save();
            console.log(`[TaskService] Task created successfully: ${savedTask._id} for user: ${userId}`);
            return savedTask;
        } catch (error) {
            console.error(`[TaskService] Error creating task for user ${userId}:`, error.message || error);
            if (error.name === 'ValidationError') {
                throw { statusCode: 400, message: "Erro de validação: " + Object.values(error.errors).map(e => e.message).join(', ') };
            }
            throw { statusCode: 500, message: "Erro ao criar tarefa." };
        }
    },

    async getTasksByUserId(userId) {
        console.log(`[TaskService] Attempting to get tasks for user: ${userId}`);
        try {
            const tasks = await Task.find({ userId });
            console.log(`[TaskService] Found ${tasks.length} tasks for user: ${userId}`);
            return tasks;
        } catch (error) {
            console.error(`[TaskService] Error getting tasks for user ${userId}:`, error.message || error);
            throw { statusCode: 500, message: "Erro ao buscar tarefas." };
        }
    },

    async getTaskByIdAndUserId(taskId, userId) {
        console.log(`[TaskService] Attempting to get task ${taskId} for user: ${userId}`);
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            console.warn(`[TaskService] Invalid Task ID format: ${taskId}`);
            throw { statusCode: 400, message: "ID da tarefa inválido." };
        }
        try {
            const task = await Task.findOne({ _id: taskId, userId });
            if (!task) {
                console.warn(`[TaskService] Task ${taskId} not found for user: ${userId}`);
                throw { statusCode: 404, message: "Tarefa não encontrada ou não pertence ao usuário." };
            }
            console.log(`[TaskService] Task ${taskId} found for user: ${userId}`);
            return task;
        } catch (error) {
            console.error(`[TaskService] Error getting task ${taskId} for user ${userId}:`, error.message || error);
            if (error.statusCode) throw error;
            throw { statusCode: 500, message: "Erro ao buscar tarefa." };
        }
    },

    async updateTaskByIdAndUserId(taskId, updateData, userId, isPatch = false) {
        console.log(`[TaskService] Attempting to ${isPatch ? 'partially ' : ''}update task ${taskId} for user: ${userId}`);
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            console.warn(`[TaskService] Invalid Task ID format for update: ${taskId}`);
            throw { statusCode: 400, message: "ID da tarefa inválido." };
        }
        try {
            const task = await Task.findOne({ _id: taskId, userId });

            if (!task) {
                console.warn(`[TaskService] Task ${taskId} not found for user ${userId} during update`);
                throw { statusCode: 404, message: "Tarefa não encontrada ou não pertence ao usuário." };
            }

            // Update fields
            Object.keys(updateData).forEach(key => {
                task[key] = updateData[key];
            });
            
            const updatedTask = await task.save({ new: true, runValidators: true });
            console.log(`[TaskService] Task ${taskId} updated successfully for user: ${userId}`);
            return updatedTask;
        } catch (error) {
            console.error(`[TaskService] Error updating task ${taskId} for user ${userId}:`, error.message || error);
            if (error.name === 'ValidationError') {
                throw { statusCode: 400, message: "Erro de validação: " + Object.values(error.errors).map(e => e.message).join(', ') };
            }
            if (error.statusCode) throw error;
            throw { statusCode: 500, message: "Erro ao atualizar tarefa." };
        }
    },

    async deleteTaskByIdAndUserId(taskId, userId) {
        console.log(`[TaskService] Attempting to delete task ${taskId} for user: ${userId}`);
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            console.warn(`[TaskService] Invalid Task ID format for delete: ${taskId}`);
            throw { statusCode: 400, message: "ID da tarefa inválido." };
        }
        try {
            const result = await Task.deleteOne({ _id: taskId, userId });
            if (result.deletedCount === 0) {
                console.warn(`[TaskService] Task ${taskId} not found for user ${userId} during delete`);
                throw { statusCode: 404, message: "Tarefa não encontrada ou não pertence ao usuário." };
            }
            console.log(`[TaskService] Task ${taskId} deleted successfully for user: ${userId}`);
            return { message: "Tarefa removida com sucesso." };
        } catch (error) {
            console.error(`[TaskService] Error deleting task ${taskId} for user ${userId}:`, error.message || error);
            if (error.statusCode) throw error;
            throw { statusCode: 500, message: "Erro ao remover tarefa." };
        }
    }
};

