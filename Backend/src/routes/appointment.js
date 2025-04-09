import express from "express";
import appointmentController from "../controllers/appointmentController.js";

const router = express.Router();

router.route("/") //Nota: sin id
.get(appointmentController.getAppointment)
.post(appointmentController.insertAppointment)

router.route("/:id") //Nota: con id
.put(appointmentController.updateAppointment)
.delete(appointmentController.deleteAppointment);

export default router;