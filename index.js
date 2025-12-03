//racine index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoute.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✔️"))
  .catch((err) => console.log("Erreur MongoDB ❌", err));


app.get("/", (req, res) => {
  res.json({ message: "Backend opérationnel" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
