import patientsModel from "../models/Patients.js";
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Generar Token
import nodemailer from "nodemailer"; //Enviar Correo
import crypto from "crypto"; //genera código aleatorio
import {config} from "../config.js"

const registerPatientsController = {};

registerPatientsController.register = async (req , res) => {
    const { nombre , edad , correo , contrasena , telefono , isVerified } = req.body;

    try {
        const existPatient = await patientsModel.findOne({correo});
        if(existPatient){
            return res.json({message: "This patient already exist"})
        }

        const passwordHash = await bcryptjs.hash(contrasena , 10)

        const newPatients = new patientsModel({ nombre , edad , correo , contrasena: passwordHash , telefono , isVerified: isVerified || false })
        newPatients.save();

        const verificationCode = crypto.randomBytes(3).toString("hex")

        const tokenCode = jsonwebtoken.sign(
            //1. Que vamos a guardar?
            {correo , verificationCode},

            //2. Palabra secreta
            config.JWT.secret,

            //3.Cuando expira
            {expiresIn: "2h"},
        ) 

        res.cookie("VerificationToken" , tokenCode , {maxAge: 2*60*60*1000})

        const transporter = nodemailer.createTransport({
            service: "gmail", auth: {user: config.email.email_user, pass: config.email.email_pass}
        })

        const mailOption = {
            //1) Quien lo envia
            from: config.email.email_user,
            //2) QUien lo recibe
            to: correo, //esta es la variable es con la que se esta registrando el cliente
            //Asunto
            subject: "Verificación de Correo",
            //cuerpo del correo
            text: `Para verificar tu correo, utiliza el siguiente código ${verificationCode}\n 
            El código vence en dos horas`
        }  

        // --------- ME DA ERROR -------------//
        transporter.sendMail(mailOption, (error,info) =>{
            if(error) return res.json({message: "Error"})
            console.log ("Correo enviado")
        })

        res.json({message: "Patient succesfully registered! Please verify your email with the code send"})

    } catch (error) {
        res.json({message: "ERROR" + error})
    }
};

registerPatientsController.verifyCodeEmail = async (req , res ) => {
    const {verificationCode} = req.body;
    const token = req.cookies.VerificationToken;

    try {
        //Verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token , config.JWT.secret)
        const {correo , verificationCode: storedCode} = decoded;

        //Comparar el código que enviamos al correo con el que el usuario escribe
        if(verificationCode !== storedCode){
            return res.json({message: "Invalid code"})
        }

        //Cambiamos el estado de "isVErified" a true
        const patient = await patientsModel.findOne({correo});
        patient.isVerified = true;
        await patient.save();

        res.json({message: "Email verified successfully!"})

        //Quito la cookie con el token
        res.clearCookie("VerificationToken")
    } catch (error) {
        res.json({message: "ERROR" + error});
    }
}

export default registerPatientsController;
