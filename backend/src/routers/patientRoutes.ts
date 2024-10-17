import express from "express";
import {
  getPatientById,
  getPatients,
  postPatients,
} from "../controllers/patientController/patientController";

const patientsRoutes = express.Router();

patientsRoutes.get("/", getPatients);
patientsRoutes.post("/", postPatients);
patientsRoutes.get("/:id",  getPatientById);

export default patientsRoutes;
