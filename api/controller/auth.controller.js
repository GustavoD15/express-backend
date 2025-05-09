import { authService } from "../services/auth.service.js";

export const authController = {
    async register(req, res, next) {
        try {
            console.log("[AuthController] Received registration request for:", req.body.email);
            const user = await authService.registerUser(req.body);
            console.log("[AuthController] Registration successful for:", user.email);
            res.status(201).json({ message: "Usuário registrado com sucesso!", user });
        } catch (error) {
            console.error("[AuthController] Registration error:", error.message || error);
            // Pass the error to the global error handler
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            console.log("[AuthController] Received login request for:", req.body.email);
            const { user, token } = await authService.loginUser(req.body);
            console.log("[AuthController] Login successful for:", user.email);
            res.status(200).json({ message: "Login bem-sucedido!", user, token });
        } catch (error) {
            console.error("[AuthController] Login error:", error.message || error);
            // Pass the error to the global error handler
            next(error);
        }
    },
};

