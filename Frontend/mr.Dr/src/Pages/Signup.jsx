import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/images/signup.gif";
import { registerUser } from "../fetch"; // Ensure this correctly calls your backend
// import { registerDoctor } from "../fetch"; // Ensure this correctly calls your backend
import { motion } from "framer-motion"; // For animated popups

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

  // Handle text and select inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input and show preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await registerUser(data); // Ensure backend handles multipart/form-data
      console.log(response);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex w-4/5 max-w-4xl">
        {/* Left Image */}
        <div className="w-1/2 flex justify-center items-center p-6 rounded-l-2xl">
          <img src={signup} alt="Illustration" className="w-full" />
        </div>

        {/* Right Form Section */}
        <div className="w-1/2 p-6 relative">
          <h2 className="text-2xl font-semibold mb-4">
            Create an <span className="text-blue-600">account</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Enter your email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="block text-gray-600 mb-1">Are you a:</label>
                <select
                  name="role"
                  className="border border-gray-300 rounded px-3 py-2"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Gender:</label>
                <select
                  name="gender"
                  className="border border-gray-300 rounded px-3 py-2"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Upload and Preview */}
            <div className="mb-6 flex items-center space-x-4">
              <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer">
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
                <img src={preview} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Signup"}
            </button>
          </form>

          {/* Success Popup Animation */}
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

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* CSS for Loader */}
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
