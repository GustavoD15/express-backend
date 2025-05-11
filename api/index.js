import express from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js';
import exampleRoute from './routes/example.route.js';
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js'; 
import verifyToken from "./middleware/jwt.token.js"; 

dotenv.config();
db.connect();

const app = express();

app.use(express.json());

// Rotas Públicas
app.get('/', (req, res) => {
    res.send({message: 'Bem-vindo à API To-Do List!'});
});

// Rotas de Autenticação (não protegidas por JWT em si, pois são para obter o token)
app.use("/api/auth", authRoutes);

// Rotas de Tarefas (protegidas por JWT)
app.use("/api/tasks", taskRoutes); // O middleware verifyToken já é aplicado dentro de task.route.js

// Rotas de Exemplo (proteger se necessário)
// Se a rota /secureExampleRoute realmente precisa ser segura, ela deve usar o verifyToken
app.use("/secureExampleRoute", verifyToken, exampleRoute);

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error("[GlobalErrorHandler] Error:", err.message);
    console.error("[GlobalErrorHandler] Status Code:", err.statusCode);
    // Não logar o stack em produção para não expor detalhes, mas útil em desenvolvimento
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

