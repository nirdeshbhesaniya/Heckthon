import { Doctor } from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// **Function to generate JWT Tokens**
const generateAccessAndRefreshTokens = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) throw new ApiError(404, "Doctor not found");

    const accessToken = jwt.sign({ _id: doctor._id, role: "doctor" }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ _id: doctor._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    doctor.refreshToken = refreshToken;
    await doctor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// **Register a new doctor**
export const registerDoctor = asyncHandler(async (req, res) => {
  const { email, password, name, phone, specialization } = req.body;

  if (!email || !password || !name || !specialization) {
    throw new ApiError(400, "All fields are required");
  }

  const existedDoctor = await Doctor.findOne({ email });
  if (existedDoctor) throw new ApiError(409, "Doctor already exists");

  // **Hash password**
  const hashedPassword = await bcrypt.hash(password, 10);

  // **Handle Image Upload**
  let photoUrl = "";
  if (req.files?.photo?.[0]?.path) {
    const uploadResult = await uploadOnCloudinary(req.files.photo[0].path);
    photoUrl = uploadResult?.url || "";
  }

  const doctor = await Doctor.create({
    email,
    password: hashedPassword,
    name,
    phone,
    specialization,
    photo: photoUrl,
  });

  res.status(201).json(new ApiResponse(201, doctor, "Doctor registered successfully"));
});

// **Login Doctor**
export const loginDoctor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const doctor = await Doctor.findOne({ email });
  if (!doctor) throw new ApiError(404, "Doctor not found");

  const isPasswordValid = await bcrypt.compare(password, doctor.password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(doctor._id);

  res.status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .json(new ApiResponse(200, { doctor, accessToken, refreshToken }, "Doctor logged in successfully"));
});

// **Logout Doctor**
export const logoutDoctor = asyncHandler(async (req, res) => {
  await Doctor.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "Doctor logged out successfully"));
});

// **Refresh Access Token**
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const doctor = await Doctor.findById(decodedToken?._id);
    if (!doctor || doctor.refreshToken !== incomingRefreshToken) throw new ApiError(401, "Invalid refresh token");

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(doctor._id);

    res.status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
      .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

// **Change Password**
export const changeDoctorPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const doctor = await Doctor.findById(req.user?._id);
  if (!doctor) throw new ApiError(404, "Doctor not found");

  const isPasswordCorrect = await bcrypt.compare(oldPassword, doctor.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  doctor.password = await bcrypt.hash(newPassword, 10);
  await doctor.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("reviews");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update doctor details
export const updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Approve or reject a doctor
export const approveDoctor = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "pending", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isApproved: status }, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
