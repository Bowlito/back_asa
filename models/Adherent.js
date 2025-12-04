// models/Adherent.js
import mongoose from "mongoose";

const adherentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    // Adresse structurée (compatible autocomplétion)
    address: {
      street: {
        type: String,
        default: "",
        trim: true,
      },
      zipCode: {
        type: String,
        default: "",
        trim: true,
      },
      city: {
        type: String,
        default: "",
        trim: true,
      },
      country: {
        type: String,
        default: "France",
        trim: true,
      },
    },

    //  Utilisateur qui a créé l’adhérent
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

const Adherent = mongoose.model("Adherent", adherentSchema);

export default Adherent;
