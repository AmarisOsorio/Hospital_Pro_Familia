const doctorsController = {};
import doctorsModel from "../models/Doctors.js";


/********************** S E L E C T **************************/


doctorsController.getDoctor = async (req , res) => {
    const doctor = await doctorsModel.find()
    res.json(doctor)
};


/********************** D E L E T E **************************/


doctorsController.deleteDoctor = async (req , res) => {
    await doctorsModel.findByIdAndDelete(req.params.id)
    res.json({message: "El registro del doctor se ha eliminado"})
};


/********************** U P D A T E **************************/


doctorsController.updateDoctor = async (req , res) => {
    const { nombre , especialidad , correo , contrasena } = req.body;
    const updatedDoctor = await doctorsModel.findByIdAndUpdate(req.params.id, { nombre , especialidad , correo , contrasena } , {new: true})
    res.json({message: "El registro del docto se ha actualizado"});
};



export default doctorsController;