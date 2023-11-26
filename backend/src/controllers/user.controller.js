import { UserModel } from "../models/user.model.js";

export const ctrlCreateUser = async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "No se pudo crear el usuario" })
        
    }
}

let usuarios = []
export const ctrlGetUser = async (req, res) => {
    res.json(usuarios)
}