import { useEffect, useState } from "react";

const MyBooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const token = localStorage.getItem("token")
        console.log(token);
        
        if (!token) throw new Error("No authentication token found!");
    
        const res = await fetch(
          "http://localhost:8000/api/v1/users/appointments/my-appointments",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Use the token variable
              "Content-Type": "application/json",
            },
          }
        );
    
        if (!res.ok) {
          // Handle non-2xx status codes
          const errorData = await res.json().catch(() => null); // Try to parse JSON, but handle parsing errors
          const errorMessage =
            errorData?.message || `HTTP error! status: ${res.status}`;
          throw new Error(errorMessage);
        }
    
        const data = await res.json();
        console.log("Received data:", data);
    
        if (data.data && data.data.booking) {
            setAppointments(data.data.booking);
        } else{
            throw new Error("Invalid data format received");
        }
    
      } catch (err) {
        console.error("Error fetching appointments:", err); // More detailed logging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My Appointments</h2>

      {loading && <p className="text-center text-gray-600">Loading appointments...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p className="text-center text-gray-700">No bookings currently. Please book an appointment now!</p>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((booking) => (
            <div key={booking._id} className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">{booking.doctor.name}</h3>
              <p className="text-gray-600"><strong>Specialization:</strong> {booking.doctor.specialization}</p>
              <p className="text-gray-600"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>Time:</strong> {booking.time}</p>
              <p className="text-gray-600"><strong>Status:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
