// import React from "react";
import { formatDate } from "../Utils/FormatDate";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doctor as doctorData } from "../assets/data/doctors";

const DoctorAbout = () => {
    const { id } = useParams();  // Get the `id` from the URL
    const [doctor, setDoctor] = useState(null);
  
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
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] ☐ text-headingColor font-semibold flex items-center gap-3">
          About of 
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {doctor.name}
          </span>
        </h3>

        <p className="text_para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eius
          assumenda corrupti at fugiat ipsum odio laudantium quisquam veritatis
          consectetur velit illo ullam animi necessitatibus vero voluptatum fuga
          consequuntur, aspernatur perspiciatis adipisci. Necessitatibus et non
          sapiente sit distinctio, repellat illo totam perspiciatis, inventore
          ex assumenda odit natus cumque saepe nostrum?
        </p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] ☐ text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formatDate("09-13-2014")}-{formatDate("03-13-2016")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in {doctor.specialization}
              </p>
            </div>

            <p className="text-[14px] leading-5 font-medium text-textColor">
              {doctor.hospital}
            </p>
          </li>
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] ">
            <div>
              <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formatDate("07-04-2010")}-{formatDate("08-13-2014")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                PHD in Surgeon
              </p>
            </div>

            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] ☐ text-headingColor font-semibold">
          Experince
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowcolor text-[15px] leading-6 font-semibold">
              {formatDate("07-04-2010")}-{formatDate("08-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. {doctor.specialization}
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
            {doctor.hospital}
            </p>
          </li>
          <li className="p-4 rounded bg-[#fff9ea]">
            <span className="text-yellowcolor text-[15px] leading-6 font-semibold">
              {formatDate("07-04-2010")}-{formatDate("08-13-2014")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hospital, New York.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default DoctorAbout;