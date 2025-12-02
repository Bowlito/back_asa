import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users);
        
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email et mot de passe requis" });
        }
        const exists = await User.findOne({ email });

        if (exists) {
            return res
                .status(400)
                .json({ message: "Utilisateur déjà existant" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            hashedPassword,
        });

        // console.log(newUser);
        

        res.status(200).json(newUser);
    } catch (error) {

        console.log("erreur serveur : ", error);
        
        res.status(500).json({ message: "Erreur serveur" });
    }
};
