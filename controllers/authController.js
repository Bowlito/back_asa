import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Email ou mot de passe erroné" });
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Email ou mot de passe erroné" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Connexion réussie",
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            },
        });
        console.log(user);
    } catch (error) {
        console.log("LOGIN ECHOUWAYYY : ", error);

        res.status(500).json({ message: "Erreur serveur" });
    }
};


