import patientsModel from "../models/Patients.js";
import doctorsModel from "../models/Doctors.js";
import bcrypt from "bcryptjs";
import jsonwebtokenerror from "jsonwebtoken";
import  {config} from "../config.js";

const loginController = {};

loginController.login = async (req , res) => {
    const { correo , contrasena } = req.body;

    try {
        let userFound; //variable para que encontremos un usuario
        let userType; // variable que nos dice su tipo de usuario

        if(correo === config.emailAdmin.email && contrasena === config.emailAdmin.password){
            userType = "Admin";
            userFound = {_id : "Admin"};
        }else{
            /*2. Doctores*/
            userFound = await doctorsModel.findOne({correo});
            userType = "Doctor"

            /*3. Pacientes*/
            if(!userFound){
                userFound = await patientsModel.findOne({correo});
                userType = "Patient"
            }
        }

        /*Si no encontramo un usuario */
        if(!userFound){
            return res.json({message: "User not found"});
        }

        if(!userType !== "Admin"){
            const isMatch = bcrypt.compare(contrasena , userFound.contrasena);
            if(!isMatch){
                return res.json({message: "Invalid password"});
            } 
        }

        jsonwebtokenerror.sign(
            {id: userFound._id , userType},

            config.JWT.secret,

            {expiresIn: config.JWT.expiresIn},

            (error , token) => {
                if(error) console.log(error);

                res.cookie("authToken",token)
                res.json({message: "login successful"})
                
            }
        )

    } catch (error) {
        console.log(error)   
    }
}

export default loginController; 