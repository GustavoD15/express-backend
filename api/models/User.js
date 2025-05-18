import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome é obrigatório."],
    trim: true
  },
  email: {
    type: String,
    required: [true, "O email é obrigatório."],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\S+@\S+\.\S+$/,
      "Por favor, forneça um endereço de e-mail válido."
    ]
  },
  password: {
    type: String,
    required: [true, "A senha é obrigatória."],
    minlength: [5, "A senha deve ter pelo menos 5 caracteres."],
    select: false // Não retorna a senha por padrão
  }
}, {
  timestamps: true // Cria createdAt e updatedAt automaticamente
});

const User = mongoose.model("User", UserSchema);

export default User;
