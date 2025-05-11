import { authService } from "../services/auth.service.js";

export const authController = {
    async register(req, res, next) {
        try {
            const { nome, email, password } = req.body;

            // Validação do tamanho da senha
            if (password.length < 5) {
                return res.status(400).json({ message: "A senha deve ter pelo menos 5 caracteres." });
            }

            // Validação do email (verifica se contém o '@')
            if (!email.includes('@')) {
                return res.status(400).json({ message: "O email informado não é válido (deve conter '@')." });
            }

            console.log("[AuthController] Received registration request for:", email);
            const user = await authService.registerUser(req.body);

            console.log("[AuthController] Registration successful for:", user.email);
            res.status(201).json({ message: "Usuário registrado com sucesso!", user });
        } catch (error) {
            console.error("[AuthController] Registration error:", error);

            // --- Tratamento de erros de validação ---
            if (error.name === "ValidationError") {
                const messages = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({ message: messages });
            }

            // --- Tratamento de email duplicado ---
            if (error.code === 11000 && error.keyPattern?.email) {
                return res.status(400).json({ message: "O email informado já está em uso." });
            }

            // --- Outros erros ---
            return res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message || error });
        }
    },

    async login(req, res, next) {
        try {
            console.log("[AuthController] Received login request for:", req.body.email);
            const { user, token } = await authService.loginUser(req.body);
            console.log("[AuthController] Login successful for:", user.email);
            res.status(200).json({ message: "Login bem-sucedido!", user, token });
        } catch (error) {
            console.error("[AuthController] Login error:", error);
            return res.status(500).json({ message: "Erro ao realizar login.", error: error.message || error });
        }
    },
};
