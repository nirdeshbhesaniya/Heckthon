import { useState } from "react";
import signup from "../assets/images/signup.gif";
import { registerUser } from "../fetch";

export default function Signup() {
  // const [fullName, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("Patient");
  // const [gender, setGender] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role:"Patient",
    gender:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData);
    console.log(response);
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex w-4/5 max-w-4xl">
        <div className="w-1/2 flex justify-center items-center p-6 rounded-l-2xl">
          <img src={signup} alt="Illustration" className="w-full" />
        </div>

        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Create an <span className="text-blue-600">account</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                // value={fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Enter your email</label>
              <input
                type="email"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                // value={email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                // value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="block text-gray-600 mb-1">Are you a:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2"
                  // value={role}
                  onChange={handleChange}
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Gender:</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2"
                  // value={gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="mb-6 flex items-center">
              <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer">
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              
            >
            Signup
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="./Login" className="text-blue-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
