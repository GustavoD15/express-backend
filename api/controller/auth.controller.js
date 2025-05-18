import { authService } from "../services/auth.service.js";

export const authController = {
  async register(req, res) {
    try {
      const { nome, email, password } = req.body;

      // Validação de campos obrigatórios
      if (!nome || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      // Validação do tamanho da senha
      if (password.length < 5) {
        return res.status(400).json({ message: "A senha deve ter pelo menos 5 caracteres." });
      }

      // Validação do email (verifica se contém o '@')
      if (!email.includes('@')) {
        return res.status(400).json({ message: "O email informado não é válido (deve conter '@')." });
      }

      console.log("[AuthController] Received registration request for:", email);
      const user = await authService.registerUser({ nome, email, password });

      console.log("[AuthController] Registration successful for:", user.email);
      return res.status(201).json({ message: "Usuário registrado com sucesso!", user });

    } catch (error) {
      console.error("[AuthController] Registration error:", error);

      // Erro de validação do Mongoose
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: messages.join(', ') });
      }

      // Email duplicado
      if (error.code === 11000 && error.keyPattern?.email) {
        return res.status(400).json({ message: "O email informado já está em uso." });
      }

      // Erro genérico com mensagem real
      return res.status(500).json({ message: error.message || "Erro ao registrar usuário." });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
      }

      console.log("[AuthController] Received login request for:", email);
      const { user, token } = await authService.loginUser({ email, password });

      console.log("[AuthController] Login successful for:", user.email);
      return res.status(200).json({ message: "Login bem-sucedido!", user, token });

    } catch (error) {
      console.error("[AuthController] Login error:", error);

      // Erros específicos de autenticação podem ser tratados dentro do service

      return res.status(500).json({ message: error.message || "Erro ao realizar login." });
    }
  },
};
