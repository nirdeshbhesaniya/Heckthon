// import { useEffect, useState } from "react";
// // import { token } from "../config.js";
// import { asyncHandler } from "../../../../Backend/src/utils/asyncHandler.js";

// const useFetchData = () => {
//   const [data, setData] = useState(null); // Set `null` as default
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = asyncHandler(async () => {
//       setLoading(true);
//       setError(null);

//     //   try {
        
//     //     if (!token) throw new Error("No authentication token found!");

//     //     const res = await fetch(url, {
//     //       method: "GET",
//     //       credentials: "include",
//     //       headers: {
//     //         "Authorization": `Bearer ${token}`,
//     //         "Content-Type": "application/json",
//     //       },
//     //     });
//     //     console.log("Response Status:", res.status);
//     //     console.log("Response Headers:", [...res.headers]); // Log headers
//     //     const responseText = await res.text();
//     //     console.log("Raw Response Body:", responseText); // Log full response
//     //     const contentType = res.headers.get("content-type");
//     //     if (!contentType || !contentType.includes("application/json")) {
//     //       throw new Error("Invalid response format (not JSON)");
//     //     }
//     //     const result = await res.json();
//     //     if (!res.ok) throw new Error(result.message || "Failed to fetch data");

//     //     setData(result.data);
//     //   } catch (err) {
//     //     setError(err.message);
//     //   } finally {
//     //     setLoading(false);
//     //   }

//     const user = localStorage.getItem("user");
//     // console.log(user);
//     setData(user);
//     setLoading(false);
//     setError(false);
//     })

//     fetchData();
//   }, []);

//   return { data,loading,error }; // Return as an object
// };

// export default useFetchData;

import { useEffect, useState } from "react";

const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const user = localStorage.getItem("user");
        if (!user) throw new Error("User not found in local storage");

        setData(JSON.parse(user)); // Parse stored JSON
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;

