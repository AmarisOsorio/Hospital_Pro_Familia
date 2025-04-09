const appointmentController = {};
import appointmentModel from "../models/Appointment.js";


/********************** S E L E C T **************************/


appointmentController.getAppointment = async (req , res) => {
    const appointment = await appointmentModel.find().populate("idDoctor").populate("idPatient")
    res.json(appointment)
};


/********************** I N S E R T **************************/


appointmentController.insertAppointment = async (req , res) => {
    const { fecha , hora , motivo , idDoctor , idPatient } = req.body;
    const newEvaluation = gradeModel({ comment , grade , role , idEmployees })
    await newEvaluation.save()
    res.json({message: "Evaluation has been save"})
};