import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/UserSchema.js"; // Updated import
import {Doctor} from "../models/DoctorSchema.js"
import {Booking} from "../models/BookingSchema.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 



// Function to generate tokens
const generateAccessAndRefreshTokens = user => {
  return jwt.sign({id:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15d"})
};

// **Register User**
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, gender, bloodType, specialization, qualifications, experiences, bio, about, timeSlots, ticketPrice } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) throw new ApiError(409, "User already exists");

  if (!["patient", "doctor"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle image uploads
  let photoUrl = "";
  if (req.files?.photo?.[0]?.path) {
    const uploadResult = await uploadOnCloudinary(req.files.photo[0].path);
    photoUrl = uploadResult?.url || "";
  }

  let user;
  if (role === "doctor") {
    user = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      photo: photoUrl,
      role,
      specialization,
      qualifications,
      experiences,
      bio,
      about,
      timeSlots,
      ticketPrice,
      isApproved: "pending",
    });
  } else {
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      gender,
      bloodType,
      photo: photoUrl,
      appointments,
    });
  }

  const createdUser = await (role === "doctor"
    ? Doctor.findById(user._id).select("-password")
    : User.findById(user._id).select("-password"));

  res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
// // **Register Doctor**
// const registerDoctor = asyncHandler(async (req, res) => {
//   const { name, email, password, phone, role, gender, bloodType } = req.body;

//   if ([name, email, password].some((field) => field?.trim() === "")) {
//     throw new ApiError(400, "Name, email, and password are required");
//   }

//   const existedUser = await User.findOne({ email });
//   if (existedUser) throw new ApiError(409, "User already exists");

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Handle image uploads
//   let photoUrl = "";
//   if (req.files?.photo?.[0]?.path) {
//     const uploadResult = await uploadOnCloudinary(req.files.photo[0].path);
//     photoUrl = uploadResult?.url || "";
//   }

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     phone,
//     role,
//     gender,
//     bloodType,
//     photo: photoUrl,
//   });

//   const createdUser = await User.findById(user._id).select("-password -refreshToken");

//   res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
// });

// **Login User**
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await Doctor.findOne({ email });
    }
    

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateAccessAndRefreshTokens(user);
    await user.save();
    // Ensure user._doc exists before destructuring
    const { password: _, role, appointments, ...rest } = user.toObject();

    return res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ status: false, message: "Failed to login" });
  }
  // if (!email || !password) throw new ApiError(400, "Email and password are required");

  // const user = await User.findOne({ email });
  // if (!user) throw new ApiError(404, "User not found");

  // // Validate password
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  // const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  // res.status(200)
  //   .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
  //   .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
  //   .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully"));
});

// **Logout User**
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// **Refresh Access Token**
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if (!user || user.refreshToken !== incomingRefreshToken) throw new ApiError(401, "Invalid refresh token");

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    res.status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
      .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
  } catch (error) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

// **Change Password**
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// Fetch User Profile (with authenticated token)
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password -refreshToken"); // Exclude password and refreshToken
//   console.log(user);
//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

  // Send back the user data including the photo URL
//   res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
// });
//updete user
export const updatedUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const updateFields = { ...req.body };

    // If a new file is uploaded, set its path
    if (req.file) {
      updateFields.photo = `/uploads/${req.file.filename}`;
    }

    // Update User or Doctor model
    const updatedUser = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true }) ||
                        await Doctor.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const id=req.params.id
  try {
    await User.findByIdAndDelete(id) || await Doctor.findByIdAndDelete(id)
    res.status(200).json({success:true,message:"Delete User Successfully"})
  } catch (err) {
    res.status(500).json({success:false,message:"failed to delete"})
  }
});

const getSingaleUser = asyncHandler(async (req, res) => {
  const id=req.params.id

  try {
    let user = await User.findById(id).select("-password") || await Doctor.findById(id).select("-password");
    res.status(200).json({success:true,message:"User Found",data:user})
  } catch (err) {
    res.status(404).json({success:false,message:"User Not Found"})
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  
  try {
    const {query} = req.query
    let doctors;
    if(query){
       doctors = await Doctor.find({
        isApproved:"approved",
        $or:[
          {name:{$regex:query,$option:'i'}},
          {specialization:{$regex:query,$option:'i'}},
        ],
      }).select("-password");
    }else{
      doctors=await Doctor.find({isApproved:"approved"}).select("-password")
    }
    const users = await User.find({}).select("-password");
    
    res.status(200).json({success:true,message:"All User Found", data:{ patients: users, doctors }})
  } catch (err) {
    res.status(404).json({success:false,message:"User Not Found"})
  }
});

const getUserProfile = asyncHandler(async(req,res)=>{
  const userId=req.userId;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({success:false,message:"User not found"})
    }

    const {password,...rest} = user._doc;
    res.status(200).json({success:true,message:"User profile fetched successfully",data:{...rest}})
  } catch (err) {
    return res.status(500).json({success:false,message:"Failed to get user profile"})
  }
})

const getDoctorProfile = asyncHandler(async(req,res)=>{
  const doctorId=req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if(!doctor){
      return res.status(404).json({success:false,message:"Doctor not found"})
    }

    const {password,...rest} = doctor._doc;
    const appointments = await Booking.find({doctor:doctorId})
    res.status(200).json({success:true,message:"User profile fetched successfully",data:{...rest,appointments}})
  } catch (err) {
    return res.status(500).json({success:false,message:"Failed to get user profile"})
  }
})

// const getMyAppointments = asyncHandler(async (req, res) => {
//   try {
//     const booking = await Booking.find({ user: req.userId })
//     const doctorIds = booking.map(el=>el.doctor.id)
//     const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");

//     res.status(200).json({ success: true, message: "Appointments fetched successfully", data: { booking, doctors } });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to get appointments" });
//   }
// });
 const getMyAppointments = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: userId }).populate("doctor", "-password");
    console.log(bookings);
    
    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No appointments found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: bookings,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Failed to get appointments" });
  }
});


export { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword,deleteUser,getSingaleUser,getAllUser,getUserProfile,getMyAppointments,getDoctorProfile};