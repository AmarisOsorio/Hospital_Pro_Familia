import express from "express";
import patientsController from "../controllers/patientsController.js";

const router = express.Router();

router.route("/") 
.get(patientsController.getPatient)

router.route("/:id") 
.put(patientsController.updatePatient)
.delete(patientsController.deletePatient);

export default router;