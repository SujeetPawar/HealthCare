import { Request, Response, NextFunction } from "express";
import AuthorizationRequestSchema from "../../db/models/autherization";

export const submitAuthorizationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      patientId,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
      doctorNotes,
    } = req.body;

    const newRequest = new AuthorizationRequestSchema({
      patientId,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
      doctorNotes,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    next(error);
  }
};

export const getAuthorizationRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests = await AuthorizationRequestSchema.find({});
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const updateAuthorizationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await AuthorizationRequestSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(updatedRequest);
  } catch (error) {
    next(error);
  }
};
