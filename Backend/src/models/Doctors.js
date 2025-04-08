/*
   Campos: 
     nombre
     especialidad
     correo
     contrasena
*/

import { Schema , model } from "mongoose";

const doctorsSchema = new Schema({
  nombre: {
      type: String,
      require: true,
      maxLength: 100
    },
  especialidad: {
      type: String,
      require: true,
      maxLength: 100
    },
  correo: {
      type: String,
      require: true
    },
  contrasena: {
      type: String,
      require: true,
      maxLength: 100
    }
})

export default model("Doctors" , doctorsSchema);