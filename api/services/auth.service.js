import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SALT_ROUNDS = 10;

export const authService = {
  async registerUser(userData) {
    const { nome, email, password } = userData;
    console.log("[AuthService] Attempting to register user:", email);

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.warn("[AuthService] Registration blocked: email already in use:", email);
        throw { statusCode: 409, message: "O email informado já está em uso." };
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = new User({
        nome,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      console.log("[AuthService] User successfully registered:", savedUser.email);

      const userToReturn = { ...savedUser._doc };
      delete userToReturn.password;

      return userToReturn;

    } catch (error) {
      console.error("[AuthService] Error during registration:", error.message || error);

      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        throw { statusCode: 400, message: `Erro de validação: ${messages.join(', ')}` };
      }

      if (error.statusCode) throw error; // Erros tratados manualmente

      throw { statusCode: 500, message: "Erro interno ao registrar usuário." };
    }
  },

  async loginUser(credentials) {
    const { email, password } = credentials;
    console.log("[AuthService] Attempting login for:", email);

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("[AuthService] JWT_SECRET não está definido.");
      throw { statusCode: 500, message: "Erro de configuração: JWT_SECRET não definido." };
    }

    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        console.warn("[AuthService] Login falhou: usuário não encontrado:", email);
        throw { statusCode: 404, message: "Usuário não encontrado." };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.warn("[AuthService] Login falhou: senha inválida para:", email);
        throw { statusCode: 401, message: "Credenciais inválidas." };
      }

      const payload = {
        id: user._id,
        email: user.email,
        nome: user.nome
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
      console.log("[AuthService] Login bem-sucedido para:", email);

      const userToReturn = { ...user._doc };
      delete userToReturn.password;

      return {
        user: userToReturn,
        token
      };

    } catch (error) {
      console.error("[AuthService] Erro ao fazer login:", error.message || error);
      if (error.statusCode) throw error;
      throw { statusCode: 500, message: "Erro interno ao fazer login." };
    }
  },
};
