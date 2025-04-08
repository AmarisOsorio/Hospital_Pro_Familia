/*
   Campos: 
     nombre,
     edad,
     correo,
     contrasena,
     telefono,
     isVerified
*/

import { Schema , model } from "mongoose";

const patientsSchema = new Schema({
  nombre: {
      type: String,
      require: true,
      maxLength: 100
    },
  edad:{
      type: Number,
      require: true,
  },
  correo:{
      type: String,
      require: true,
      maxLength: 100
  },
  contrasena:{
      type: String,
      require: true,
  },
  telefono:{
        type: String,
        maxLength: 9
  },
  isVerified: {
    type: Boolean,
    require: true
  }
})

export default model("Patients" , patientsSchema);