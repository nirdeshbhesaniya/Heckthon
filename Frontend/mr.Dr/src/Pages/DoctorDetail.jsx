import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { doctor as doctorData } from "../assets/data/doctors"; // Assuming you have a static list of doctor data
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";


export default function DoctorDetail() {
  const { id } = useParams();  // Get the `id` from the URL
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  // Find the doctor based on the ID
  useEffect(() => {
    const doctorDetails = doctorData.find((doctor) => doctor.id === id);
    setDoctor(doctorDetails);
  }, [id]);

  // If doctor data is not loaded, show a loading state or error
  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Profile Image */}
          <div className="w-full md:w-64 aspect-square rounded-lg overflow-hidden bg-purple-500">
            <img
              src={doctor.photo}
              alt="Doctor profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              {doctor.specialization}
            </div>

            <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{doctor.avgRating}</span>
              <span className="text-gray-500">({doctor.totalPatients})</span>
            </div>

            <p className="text-gray-600 mb-6">{doctor.bio}</p>

            <div className="w-full">
              <div className="grid w-full grid-cols-2 max-w-[400px] border-b">
                <button
                  className={`py-2 px-4 ${activeTab === "about" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === "feedback" ? "border-b-2 border-blue-500" : ""}`}
                  onClick={() => setActiveTab("feedback")}
                >
                  Feedback
                </button>
              </div>
              <div className="mt-6 prose">
                {activeTab === "about" ? (
                  <>
                    
                    <DoctorAbout/>
                    <p>{doctor.about}</p>
                  </>
                ) : (
                  <>
                    <h3>Patient Feedback</h3>
                    <Feedback/>
                   
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
