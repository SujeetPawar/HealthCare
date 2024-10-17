import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(email);
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/sign-in",
        {
          username: email,
          password,
        }
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            Sign In to your account
          </h1>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email/Username
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2.5 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
