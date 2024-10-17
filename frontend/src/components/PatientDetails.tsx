import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "./Dashboard";
import Header from "./Header";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);
  const [treatmentType, setTreatmentType] = useState("Standard");
  const [insurancePlan, setInsurancePlan] = useState("Basic Health Plan");
  const [doctorNotes, setDoctorNotes] = useState("Routine check-up");
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  const generateRandomDiagnosisCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/patients/${id}`
        );
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleAuthorizationRequest = async () => {
    setLoading(true);
    try {
      const authRequest = {
        patientId: patient?._id,
        treatmentType,
        insurancePlan,
        dateOfService: new Date().toISOString(),
        diagnosisCode: generateRandomDiagnosisCode(),
        doctorNotes,
        status,
        _id: id,
        updatedAt: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/api/v1/auth/", authRequest);

      alert("Authorization request submitted successfully");
    
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error submitting authorization request:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!patient) return <div className="bg-blue-950 min-h-screen flex justify-center items-center text-3xl">Loading...</div>;

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col overflow-x-hidden">
      {/* Fixed Header */}
      <header className="w-full fixed top-0 bg-blue-900 text-white shadow-md z-50">
        <Header title="Patient Details" />
      </header>

      {/* Content Wrapper */}
      <div className="flex-grow flex items-center justify-center pt-20 px-4 md:px-8 overflow-x-auto w-full">
        <div className="w-full max-w-full md:max-w-2xl bg-white rounded-lg p-4 md:p-8 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-6">
            {patient.name}
          </h1>
          <p className="text-base md:text-lg mb-4">
            <strong>Age:</strong> {patient.age}
          </p>
          <p className="text-base md:text-lg mb-4">
            <strong>Medical History:</strong> {patient.medicalHistory.join(", ")}
          </p>
          <p className="text-base md:text-lg mb-4">
            <strong>Treatment Plan:</strong> {patient.treatmentPlan.join(", ")}
          </p>
          <p className="text-base md:text-lg mb-6">
            <strong>Date Created:</strong>{" "}
            {new Date(patient.createdAt).toLocaleDateString()}
          </p>

          {/* Dropdown for Treatment Type */}
          <div className="mb-4">
            <label className="block text-base md:text-lg font-medium mb-2" htmlFor="treatmentType">
              Treatment Type
            </label>
            <select
              id="treatmentType"
              className="w-full border rounded px-3 py-2 text-sm md:text-base"
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          {/* Dropdown for Insurance Plan */}
          <div className="mb-4">
            <label className="block text-base md:text-lg font-medium mb-2" htmlFor="insurancePlan">
              Insurance Plan
            </label>
            <select
              id="insurancePlan"
              className="w-full border rounded px-3 py-2 text-sm md:text-base"
              value={insurancePlan}
              onChange={(e) => setInsurancePlan(e.target.value)}
            >
              <option value="Basic Health Plan">Basic Health Plan</option>
              <option value="Premium Health Plan">Premium Health Plan</option>
              <option value="Gold Health Plan">Gold Health Plan</option>
            </select>
          </div>

          {/* Dropdown for Doctor Notes */}
          <div className="mb-4">
            <label className="block text-base md:text-lg font-medium mb-2" htmlFor="doctorNotes">
              Doctor Notes
            </label>
            <select
              id="doctorNotes"
              className="w-full border rounded px-3 py-2 text-sm md:text-base"
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
            >
              <option value="Routine check-up">Routine check-up</option>
              <option value="Urgent care required">Urgent care required</option>
              <option value="Follow-up needed">Follow-up needed</option>
            </select>
          </div>

          {/* Dropdown for Status */}
          <div className="mb-4">
            <label className="block text-base md:text-lg font-medium mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="w-full border rounded px-3 py-2 text-sm md:text-base"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
          </div>

          {/* Button to submit Prior Authorization */}
          <div className="mt-6">
            <button
              onClick={handleAuthorizationRequest}
              className={`w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm md:text-base ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Authorization Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
