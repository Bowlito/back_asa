//models>User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "pro", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true, // ajoute createdAt et updatedAt automatiquement
    }
);

const User = mongoose.model("User", userSchema);

export default User;
