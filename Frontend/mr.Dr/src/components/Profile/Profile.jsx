

export default function Profile() {

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <div className="flex items-center mb-6">
          <img
            src={photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
            <p className="text-gray-600">{userData.role}</p>
          </div>
        </div>

        {editing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Role</label>
              <select
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Gender</label>
              <select
                className="w-full p-2 border-b border-gray-300 outline-none focus:border-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-2">
              <strong>Role:</strong> {userData.role}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Gender:</strong> {userData.gender}
            </p>

            {role === "Doctor" ? (
              <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-blue-700">Doctor&apos;s Panel</h3>
                <p>Manage your patients and schedule.</p>
              </div>
            ) : (
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-700">Patient&apos;s Dashboard</h3>
                <p>View your health records and appointments.</p>
              </div>
            )}

            <button
              className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}

        <button
          className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
