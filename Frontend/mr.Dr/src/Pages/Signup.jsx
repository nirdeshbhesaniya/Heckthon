import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/images/signup.gif";
import { registerUser } from "../fetch";
import { motion } from "framer-motion";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    gender: "male",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await registerUser(data);
      console.log(response);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        <div className="md:w-1/2 flex justify-center items-center p-4 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          <img src={signup} alt="Illustration" className="w-full max-w-sm" />
        </div>

        <div className="md:w-1/2 p-4 relative">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center md:text-left">
            Create an <span className="text-blue-600">account</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="flex flex-col md:flex-row md:space-x-4">
              <select
                name="role"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>

              <select
                name="gender"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 md:mt-0"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer text-center">
                Upload Photo
                <input
                  type="file"
                  name="photo"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Signup"}
            </button>
          </form>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-10 right-10 bg-green-500 text-white p-4 rounded-lg shadow-lg"
            >
              Registration Successful! Redirecting...
            </motion.div>
          )}

          <p className="text-center text-gray-600 mt-4">
            Already have an account? <a href="/login" className="text-blue-600 font-medium">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
