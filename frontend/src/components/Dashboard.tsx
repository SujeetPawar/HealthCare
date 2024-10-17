import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

export interface Patient {
  _id: string;
  name: string;
  age: number;
  medicalHistory: string[];
  treatmentPlan: string[];
  createdAt: string;
}

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

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [authRequests, setAuthRequests] = useState<AuthorizationRequest[]>([]);
  const [minAge, setMinAge] = useState<number | "">("");
  const [maxAge, setMaxAge] = useState<number | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/signin"); 
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/patients/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        //@ts-ignore
        if (error?.response && error.response.status === 401) {
          localStorage.removeItem("authToken"); 
          navigate("/signin"); 
        }
      }
    };

    const fetchAuthRequests = async () => {
      try {
        const authResponse = await axios.get(
          "http://localhost:3000/api/v1/auth/"
        );
        setAuthRequests(authResponse.data);
      } catch (error) {
        console.error("Error fetching authorization requests:", error);
      }
    };

    fetchPatients();
    fetchAuthRequests(); 
  }, [navigate]);

  const filteredPatients = patients
    .filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((patient) => {
      if (!filterDate) return true;
      const createdAt = new Date(patient.createdAt).toISOString().split("T")[0];
      return createdAt === filterDate;
    })
    .filter((patient) => {
      if (minAge !== "" && maxAge !== "") {
        return patient.age >= minAge && patient.age <= maxAge;
      }
      if (minAge !== "") {
        return patient.age >= minAge;
      }
      if (maxAge !== "") {
        return patient.age <= maxAge;
      }
      return true;
    });

  return (
    <div className="min-h-screen bg-blue-950 overflow-x-hidden">
      {/* Header Component */}
      <Header title="Patient Dashboard" />

      {/* Info Boxes */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-800 text-white p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Patients</h2>
          <p className="text-2xl mt-2">{patients.length}</p>
        </div>
        <div
          className="bg-yellow-500 text-white p-4 rounded-lg cursor-pointer"
          onClick={() => navigate("/create-authorization")}
        >
          <h2 className="text-xl font-bold">
            Prior Authorization Notice Submission
          </h2>
          <p className="text-2xl mt-2">{authRequests.length}</p>{" "}
          {/* Dynamic count */}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search Patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Age Filter */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <input
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) =>
              setMinAge(e.target.value !== "" ? parseInt(e.target.value) : "")
            }
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) =>
              setMaxAge(e.target.value !== "" ? parseInt(e.target.value) : "")
            }
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Add Patient Button */}
        <div className="mt-4">
          <button
            onClick={() => navigate("/patients/new")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          >
            Add New Patient
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-center">ID</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Age</th>
              <th className="p-2 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient._id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/patients/${patient._id}`)}
              >
                <td className="border p-2 text-center break-words">
                  {patient._id}
                </td>
                <td className="border p-2 text-center">{patient.name}</td>
                <td className="border p-2 text-center">{patient.age}</td>
                <td className="border p-2 text-center">
                  {new Date(patient.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
