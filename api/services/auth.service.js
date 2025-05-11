import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// const JWT_SECRET = process.env.JWT_SECRET; // Moved to be read inside functions
const SALT_ROUNDS = 10;

export const authService = {
    async registerUser(userData) {
        console.log("[AuthService] Attempting to register user:", userData.email);
        const { nome, email, password } = userData;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.error("[AuthService] Registration failed: Email already exists -", email);
                throw { statusCode: 409, message: "Email já cadastrado." };
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            
            const newUser = new User({
                nome,
                email,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            console.log("[AuthService] User registered successfully:", savedUser.email);
            
            const userToReturn = { ...savedUser._doc };
            delete userToReturn.password;
            return userToReturn;

        } catch (error) {
            console.error("[AuthService] Error during user registration:", error.message || error);
            if (error.name === 'ValidationError') {
                // Construct a more detailed error message from Mongoose validation errors
                const messages = Object.values(error.errors).map(val => val.message);
                throw { statusCode: 400, message: `Erro de validação: ${messages.join(', ')}` };
            }
            if (error.statusCode) throw error; // Rethrow custom errors
            throw { statusCode: 500, message: "Erro ao registrar usuário." };
        }
    },

    async loginUser(credentials) {
        console.log("[AuthService] Attempting to login user:", credentials.email);
        const { email, password } = credentials;
        const JWT_SECRET = process.env.JWT_SECRET; // Read JWT_SECRET here

        if (!JWT_SECRET) {
            console.error("[AuthService] JWT_SECRET is not defined. Check .env file and server configuration.");
            throw { statusCode: 500, message: "Erro de configuração do servidor: Segredo JWT não definido." };
        }

        try {
            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                console.error("[AuthService] Login failed: User not found -", email);
                throw { statusCode: 404, message: "Usuário não encontrado." };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error("[AuthService] Login failed: Invalid credentials for user -", email);
                throw { statusCode: 401, message: "Credenciais inválidas." };
            }

            const payload = {
                id: user._id,
                email: user.email,
                nome: user.nome
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            console.log("[AuthService] User logged in successfully:", user.email);

            const userToReturn = { ...user._doc };
            delete userToReturn.password;

            return {
                user: userToReturn,
                token,
            };

        } catch (error) {
            console.error("[AuthService] Error during user login:", error.message || error);
            if (error.statusCode) throw error; // Rethrow custom errors
            throw { statusCode: 500, message: "Erro ao fazer login." };
        }
    },
};

