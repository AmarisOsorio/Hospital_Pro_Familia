/*
   Campos: 
     fecha
     hora
     motivo
     doctorAsignado
     pacienteAsignado
*/

import { Schema , model } from "mongoose"; 

const appointmentSchema = new Schema({
    fecha: {
        type: Date,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
    motivo: {
        type: String,
        require: true,
        maxLenght: 150
    },
    idDoctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctors",
        require: true
    },
    idPatient: {
        type: Schema.Types.ObjectId,
        ref: "Patients",
        require: true
    }
})

export default model("Appoinment" , appointmentSchema);