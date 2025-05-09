import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O título da tarefa é obrigatório."],
        trim: true,
        maxlength: [100, "O título da tarefa não pode exceder 100 caracteres."]
    },
    descricao: {
        type: String,
        required: false,
        trim: true,
        maxlength: [1000, "A descrição da tarefa não pode exceder 1000 caracteres."]
    },
    status: {
        type: String,
        required: [true, "O status da tarefa é obrigatório."],
        enum: ["pendente", "em andamento", "concluída"],
        default: "pendente"
    },
    data: {
        type: String, 
        required: [true, "A data da tarefa é obrigatória."],
        match: [/^\d{2}\/\d{2}\/\d{2}$/, "Formato de data inválido. Use dd/mm/yy."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;

