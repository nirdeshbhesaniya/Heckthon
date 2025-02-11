// import userImg from "../../assets/images/doctor-img01.png";
// import { useContext, useState } from "react";
// import { UserContext } from "../../userContext";
// import MyBooking from "../user-account/MyBooking";
// import Profile from "../user-account/Profile";
// import useGetProfile from "../../hooks/useFetchData";
// // import { BASE_URL } from "../../config.js";

// const MyAccount = () => {
//   const { dispatch } = useContext(UserContext);
//   const [tab, setTab] = useState("bookings");
//   const { data, loading, error } = useGetProfile();
//   const user = { data, loading, error };


//  console.log(user)
 

//   const handleLogout = () => {
//     dispatch({ type: "LOGOUT" });
//     localStorage.removeItem("token");
//     localStorage.clear(); // Ensure token is removed on logout
//     sessionStorage.clear();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-2xl shadow-lg w-96 flex flex-col items-center">
//         <img
//           src={userImg}
//           alt="Profile"
//           className="w-24 h-24 rounded-full border-4 border-blue-500"
//         />
//         <h2 className="text-xl font-semibold mt-4">
//           {loading ? "Loading..." : user?.name || "User Name"}
//         </h2>
//         <p className="text-gray-600">{user?.email || "example@gmail.com"}</p>
//         <p className="text-gray-700 mt-2">
//           Blood Type: <span className="font-bold">{user?.bloodType || "N/A"}</span>
//         </p>
//         {error && <p className="text-red-500">{error}</p>}

//         <div className="mt-6 w-full">
//           <button onClick={handleLogout} className="w-full bg-black text-white py-2 rounded-lg mb-3">
//             Logout
//           </button>
//           <button className="w-full bg-red-600 text-white py-2 rounded-lg">Delete account</button>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex gap-4 mt-6">
//         <button
//           onClick={() => setTab("bookings")}
//           className={`${tab === "bookings" ? "bg-primaryColor text-white font-normal" : ""} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
//         >
//           My Bookings
//         </button>
//         <button
//           onClick={() => setTab("settings")}
//           className={`${tab === "settings" ? "bg-primaryColor text-white font-normal" : ""} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
//         >
//           Profile Settings
//         </button>
//       </div>

//       {/* Conditional Rendering */}
//       {tab === "bookings" && <MyBooking />}
//       {tab === "settings" && <Profile />}
//     </div>
//   );
// };

// export default MyAccount;
import userImg from "../../assets/images/doctor-img01.png";
import { useContext, useState } from "react";
import { UserContext } from "../../userContext";
import MyBooking from "../user-account/MyBooking";
import Profile from "../user-account/Profile";
import useFetchData from "../../hooks/useFetchData";

const MyAccount = () => {
  const { dispatch } = useContext(UserContext);
  const [tab, setTab] = useState("bookings");
  const { data, loading, error } = useFetchData();
console.log(data);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data on logout
    sessionStorage.clear();
    localStorage.clear();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 flex flex-col items-center">
        <img
          src={`${data? data.photo : userImg}`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <h2 className="text-xl font-semibold mt-4">
          {loading ? "Loading..." : data?.name || "User Name"}
        </h2>
        <p className="text-gray-600">{data?.email || "example@gmail.com"}</p>
        <p className="text-gray-700 mt-2">
          Blood Type: <span className="font-bold">{data?.bloodType || "N/A"}</span>
        </p>
        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-6 w-full">
          <button onClick={handleLogout} className="w-full bg-black text-white py-2 rounded-lg mb-3">
            Logout
          </button>
          <button className="w-full bg-red-600 text-white py-2 rounded-lg">Delete account</button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setTab("bookings")}
          className={`${tab === "bookings" ? "bg-primaryColor text-white font-normal" : ""} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
        >
          My Bookings
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${tab === "settings" ? "bg-primaryColor text-white font-normal" : ""} p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
        >
          Profile Settings
        </button>
      </div>

      {/* Conditional Rendering */}
      {tab === "bookings" && <MyBooking />}
      {tab === "settings" && <Profile />}
    </div>
  );
};

export default MyAccount;

