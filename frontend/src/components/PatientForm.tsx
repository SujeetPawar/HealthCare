import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const PatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  const [treatmentPlan, setTreatmentPlan] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/v1/patients",
        {
          name,
          age: Number(age),
          medicalHistory,
          treatmentPlan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Patient added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient");
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="w-full fixed top-0 text-white shadow-md z-50">
        <Header title="Patient Form" />
      </header>

      {/* Form Wrapper */}
      <div className="flex-grow flex items-center justify-center pt-20 px-4 md:px-8">
        <div className="w-full max-w-lg bg-white rounded-lg p-6 md:p-8 shadow-lg min-h-[500px]">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-6">Add Patient</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Medical History:</label>
              <textarea
                value={medicalHistory.join(", ")}
                onChange={(e) => setMedicalHistory(e.target.value.split(", "))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Separate by commas"
              />
            </div>
            <div>
              <label className="block text-gray-700">Treatment Plan:</label>
              <textarea
                value={treatmentPlan.join(", ")}
                onChange={(e) => setTreatmentPlan(e.target.value.split(", "))}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Separate by commas"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Patient
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
