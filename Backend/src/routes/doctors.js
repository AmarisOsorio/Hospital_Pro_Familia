import express from "express";
import doctorsController from "../controllers/doctorsController.js";

const router = express.Router();

router.route("/") //Nota: sin id
.get(doctorsController.getDoctor)

router.route("/:id") //Nota: con id
.put(doctorsController.updateDoctor)
.delete(doctorsController.deleteDoctor);

export default router;