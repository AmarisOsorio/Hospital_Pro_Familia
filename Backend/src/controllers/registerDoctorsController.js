import Doctors from "../models/Doctors.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Generar Token
import {config} from "../config.js"

const registerDoctorsController = {};

registerDoctorsController.register = async ( req , res ) => {
    const { nombre , especialidad , correo , contrasena } = req.body;

    try {
        const existDoctor = await Doctors.findOne({correo});
        if(existDoctor){
            return res.json({message: "This doctor already exists"})
        }

        const passwordHash = await bcryptjs.hash( correo , 10 );

        const newDoctor = new Doctors({ nombre , especialidad , correo , contrasena: passwordHash });
        await newDoctor.save();

        jsonwebtoken.sign(
            {id: newDoctor._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            ( error , token ) => {
                if(error) console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Doctor registrado"})
            }
        )
    } catch (error) {
        console.log(error)
        res.json({message: "Error al registrar un doctor"})
    }
}

export default registerDoctorsController;