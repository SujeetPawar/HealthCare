import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import AddPatient from "./components/Addpatient";
import CreateAuthorization from "./components/CreateAutherization";
import SignUp from "./components/Signup";
import PatientForm from "./components/PatientForm";
import PatientDetails from "./components/PatientDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); 
  }, []);

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
   
    if (isAuthenticated === null) {
      return <div className="bg-blue-950 min-h-screen flex justify-center items-center text-3xl">Loading...</div>;; 
    }
    return isAuthenticated ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/new"
          element={
            <PrivateRoute>
              <PatientForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/:id"
          element={
            <PrivateRoute>
              <PatientDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-authorization"
          element={
            <PrivateRoute>
              <CreateAuthorization />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-patient"
          element={
            <PrivateRoute>
              <AddPatient />
            </PrivateRoute>
          }
        />

        {/* Redirect to dashboard if logged in, or SignIn if not */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
