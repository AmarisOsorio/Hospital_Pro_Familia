const appointmentController = {};
import appointmentModel from "../models/Appointment.js"


/********************** S E L E C T **************************/


appointmentController.getAppointment = async (req , res) => {
    const appointment = await appointmentModel.find().populate("idDoctor").populate("idPatient")
    res.json(appointment)
};


/********************** I N S E R T **************************/


appointmentController.insertAppointment = async (req , res) => {
    const { fecha , hora , motivo , idDoctor , idPatient } = req.body;
    const newAppointment = appointmentModel({ fecha , hora , motivo , idDoctor , idPatient })
    await newAppointment.save()
    res.json({message: "The appointment has been saved"})
};


/********************** D E L E T E **************************/


appointmentController.deleteAppointment = async (req , res) => {
    await appointmentModel.findByIdAndDelete(req.params.id)
    res.json({message: "The appointment has been deleted"})
};


/********************** U P D A T E **************************/


appointmentController.updateAppointment = async (req , res) => {
    const { fecha , hora , motivo , idDoctor , idPatient } = req.body;
    await gradeModel.findByIdAndUpdate(req.params.id,{fecha , hora , motivo , idDoctor , idPatient},{new : true})
    res.json({message: "The appointment has been updated"})
};


export default appointmentController;