import express from 'express';
import cors from 'cors'; // ✅ importação adicionada
import dotenv from 'dotenv';
import db from './database/configdb.js';
import exampleRoute from './routes/example.route.js';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js'; 
import verifyToken from "./middleware/jwt.token.js"; 

dotenv.config();
db.connect();

const app = express();

// ✅ Ativando o CORS — ajuste para aceitar seu frontend (ex: Vite em :5173)
app.use(cors({
    origin: 'http://localhost:3001', // ajuste para sua porta do frontend
    credentials: true
}));

app.use(express.json());

// Rotas Públicas
app.get('/', (req, res) => {
    res.send({message: 'Bem-vindo à API To-Do List!'});
});

// Rotas de Autenticação
app.use("/api/auth", authRoutes);

// Rotas de Tarefas (protegidas por JWT)
app.use("/api/tasks", taskRoutes);

// Rota de exemplo protegida
app.use("/secureExampleRoute", verifyToken, exampleRoute);

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error("[GlobalErrorHandler] Error:", err.message);
    console.error("[GlobalErrorHandler] Status Code:", err.statusCode);
    if (process.env.NODE_ENV !== 'production') {
        console.error("[GlobalErrorHandler] Stack:", err.stack);
    }
    res.status(err.statusCode || 500).json({
        message: err.message || 'Ocorreu um erro interno no servidor.',
        status: err.statusCode || 500
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta http://localhost:${PORT}/`);
});
