import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const verifyToken = async (req, res, next) => {
    console.log("[AuthMiddleware] Verifying token...");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.warn("[AuthMiddleware] No token provided.");
        return res.status(401).json({ message: "Token não fornecido. Acesso não autorizado." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email, nome: decoded.nome };
        console.log("[AuthMiddleware] Token verified successfully for user:", decoded.email);
        next();
    } catch (error) {
        console.error("[AuthMiddleware] Token verification failed:", error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado. Por favor, faça login novamente." });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: "Token inválido. Acesso negado." });
        }
        return res.status(403).json({ message: "Falha na autenticação do token." });
    }
};

export default verifyToken;

