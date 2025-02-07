import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        setMessage("Login successful!");
        setShowMessage(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.message || "Login failed. Please try again.");
        setShowMessage(true);
      }
    } catch {
      setMessage("An error occurred. Please try again.");
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          Hello! <span className="text-blue-600">Welcome Back</span> 🎉
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Enter Your Email</label>
            <input
              type="email"
              className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-600"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : "Login"}
          </button>
        </form>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`mt-4 p-2 text-center text-white ${message.includes("failed") ? "bg-red-500" : "bg-green-500"} rounded`}
          >
            {message}
          </motion.div>
        )}

        <p className="text-center text-gray-600 mt-4">
          Do not have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-2">
          <Link to="/change-password" className="text-blue-600">
            Forgot Password?
          </Link>
        </p>
      </div>
      <style>
        {`
          .loader {
            border: 3px solid white;
            border-top: 3px solid blue;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
