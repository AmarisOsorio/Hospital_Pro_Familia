const patientsController = {};
import patientsModel from '../models/Patients.js';


/********************** S E L E C T **************************/


patientsController.getPatient = async (req , res) => {
    const patient = await patientsModel.find()
    res.json(patient)
};


/********************** D E L E T E **************************/


patientsController.deletePatient = async (req , res) => {
    await patientsModel.findByIdAndDelete(req.params.id)
    res.json({message: "The patient file has been removed"})
};


/********************** U P D A T E **************************/


patientsController.updatePatient = async (req , res) => {
    const { nombre , edad , correo , contrasena , telefono , isVerified } = req.body;
    const updatedPatient = await patientsModel.findByIdAndUpdate(req.params.id, { nombre , edad , correo , contrasena , telefono , isVerified } , {new: true})
    res.json({message: "The patient file has been updated!"});
};

export default patientsController;