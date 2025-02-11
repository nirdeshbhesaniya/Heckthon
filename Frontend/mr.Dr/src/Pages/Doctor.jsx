import { useState, useEffect } from "react";
import DoctorList from "../components/Doctors/DoctorList";
import Testimonial from "../components/Testimonial/Testimonial";

const Doctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []); // Fetch all doctors on initial render

  const fetchDoctors = async (query = "01") => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/?query=${query}`
      );
      const data = await response.json();
      if (data.success) {
        setDoctors(data.data.doctors);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSearch = () => {
    fetchDoctors(searchQuery); // Fetch doctors based on search query
  };

  return (
    <>
      <section className="bg-[#fff9ea] flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Find a Doctor
          </h2>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Search for a doctor..."
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-medium transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Great Doctors</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <DoctorList doctors={doctors} />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What Our Patients Say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctor;
