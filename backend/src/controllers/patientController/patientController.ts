import { Request, Response, NextFunction } from "express";
import patientsSchema from "../../db/models/Patient";

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && typeof search === "string") {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { medicalHistory: { $regex: search, $options: "i" } },
          { treatmentPlan: { $regex: search, $options: "i" } },
        ],
      };
    }

    const patients = await patientsSchema.find(query);
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientsSchema.findById(req.params.id);
    if (!patient) {
      res.status(404);
      throw new Error("Patient not found");
    }
    res.json(patient);
  } catch (error) {
    next(error);
  }
};

export const postPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, age, medicalHistory, treatmentPlan } = req.body;

    const newPatient = new patientsSchema({
      name,
      age,
      medicalHistory,
      treatmentPlan,
      createdAt: new Date(),
    });

    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    next(error);
  }
};
