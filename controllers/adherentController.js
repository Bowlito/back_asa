import Adherent from "../models/Adherent.js";

export async function createAdherent(req, res) {
    try {
        const data = req.body;
        console.log(req.body);
        const userId = req.body.userId
        
        

        if (!data.firstname || !data.lastname || !data.email) {
            return res
                .status(400)
                .json({ message: "Champs obligatoires manquants" });
        }

        const newAdherent = await Adherent.create({...data, createdBy: userId,});

        console.log("ADHERENT : ", newAdherent);

        res.status(201).json(newAdherent);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur serveur sur adherent controller",
        });
    }
}

export async function getAdherents(req, res){
    try {
        const adherents = await Adherent.find().populate("createdBy", "firstname lastname email");
        res.status(200).json(adherents);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Erreur serveur getAdherents" });
    }
}
