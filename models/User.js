import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Le prénom est obligatoire"],
      trim: true,
      minlength: [2, "Le prénom doit contenir au moins 2 caractères"],
      maxlength: [50, "Le prénom ne peut pas dépasser 50 caractères"],
      match: [/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/, "Le prénom contient des caractères invalides"],
    },
    lastname: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
      maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"],
      match: [/^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/, "Le nom contient des caractères invalides"],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Veuillez entrer une adresse email valide",
      ],
    },
    hashedPassword: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
    //   minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
      // Pas de regex ici, car le hash n'est pas du texte lisible
    },
    role: {
      type: String,
      enum: ["user", "pro", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
