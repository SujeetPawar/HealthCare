import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";


export interface AuthorizationRequest {
  _id: string;
  patientId: string;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: string;
  diagnosisCode: string;
  doctorNotes: string;
  status: string;
}


const CreateAuthorization = () => {
  const [authRequests, setAuthRequests] = useState<AuthorizationRequest[]>([]);

  useEffect(() => {
    const fetchAuthRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/auth/`);
        setAuthRequests(response.data);
      } catch (error) {
        console.error("Error fetching authorization requests:", error);
      }
    };

    fetchAuthRequests();
  }, []);

  const updateAuthorizationStatus = async (id: string, currentStatus: string) => {
    if (currentStatus === "Approved") {
      alert("This request is already approved.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/api/v1/auth/${id}`, {
        status: "Approved",
      });
      alert("Authorization request approved.");
      setAuthRequests(
        authRequests.map((req) =>
          req._id === id ? { ...req, status: "Approved" } : req
        )
      );
    } catch (error) {
      console.error("Error updating authorization status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 overflow-x-hidden">
      {/* Fixed Header */}
      <header className="w-full fixed top-0 text-white shadow-md z-50">
        <Header title="Authorization Requests" />
      </header>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-white p-4 md:p-6 pt-24 md:pt-24">
        Authorization Requests
      </h1>

      {/* Authorization Requests List */}
      <div className="px-4 md:px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
        {authRequests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer overflow-hidden"
            onClick={() =>
              updateAuthorizationStatus(request._id, request.status)
            }
          >
            <h2 className="text-xl font-bold mb-2">
              Patient ID: {request.patientId}
            </h2>
            <p className="text-sm md:text-base">Treatment Type: {request.treatmentType}</p>
            <p className="text-sm md:text-base">Insurance Plan: {request.insurancePlan}</p>
            <p className="text-sm md:text-base font-semibold">Status: {request.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateAuthorization;
