//Librerias
import express from "express";
import cookieParser from "cookie-parser";

import registerDoctorsRoute from "./src/routes/registerDoctors.js";
import doctorsRoute from "./src/routes/doctors.js";
import registerPatientsRoute from "./src/routes/registerPatients.js"
import patientsRoute from "./src/routes/patients.js";
import appointmentRoute from "./src/routes/appointment.js"
import loginRoute from "./src/routes/login.js"
import logoutRoute from "./src/routes/logout.js";

const app = express();

app.use(express.json()); //Esto permitira el uso de middleware para que acepte datos json, se coloca siempre arriba de la ruta
app.use(cookieParser()); // Que acepte cookies


// ----- RUTAS ----- //
app.use("/api/doctorsRegister" , registerDoctorsRoute);
app.use("/api/doctors" , doctorsRoute);
app.use("/api/patientsRegister" , registerPatientsRoute);
app.use("/api/patients" , patientsRoute);
app.use("/api/appointment" , appointmentRoute);
app.use("/api/login" , loginRoute);
app.use("/api/logout" , logoutRoute);




export default app;