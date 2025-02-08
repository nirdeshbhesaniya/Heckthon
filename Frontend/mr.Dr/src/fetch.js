// Register User
export const registerUser = async (formData) => {
  try {
    // Sending FormData to backend with credentials
    const response = await fetch("http://localhost:8000/api/v1/users/register", {
      method: "POST",
      body: formData,  // formData will automatically set the correct content-type to multipart/form-data
      credentials: "include", // Ensure credentials are included
      headers: {
        Accept: "application/json", // Allow server to send JSON response
        // You don't need Content-Type header when using FormData
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response if it's successful
    return await response.json();
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};
export const registerDoctor = async (formData) => {
  try {
    // Sending FormData to backend with credentials
    const response = await fetch("http://localhost:8000/api/v1/doctors/register", {
      method: "POST",
      body: formData,  // formData will automatically set the correct content-type to multipart/form-data
      credentials: "include", // Ensure credentials are included
      headers: {
        Accept: "application/json", // Allow server to send JSON response
        // You don't need Content-Type header when using FormData
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response if it's successful
    return await response.json();
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};



// Fetch Protected Data (optional, if needed in future)
// export const fetchProtectedData = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) throw new Error("No token found");

//     const response = await fetch("http://localhost:8000/api/v1/protected", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,  // Send the token as a Bearer Authorization header
//       },
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Protected Route Error:", error);
//   }
// };
