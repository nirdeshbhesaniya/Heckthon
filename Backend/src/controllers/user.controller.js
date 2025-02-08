import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/UserSchema.js"; // Updated import
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
  const { name, email, password, phone, role, gender, bloodType } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) throw new ApiError(409, "User already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle image uploads
  let photoUrl = "";
  if (req.files?.photo?.[0]?.path) {
    const uploadResult = await uploadOnCloudinary(req.files.photo[0].path);
    photoUrl = uploadResult?.url || "";
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    gender,
    bloodType,
    photo: photoUrl,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});
// **Register Doctor**
const registerDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, gender, bloodType } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) throw new ApiError(409, "User already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Handle image uploads
  let photoUrl = "";
  if (req.files?.photo?.[0]?.path) {
    const uploadResult = await uploadOnCloudinary(req.files.photo[0].path);
    photoUrl = uploadResult?.url || "";
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    gender,
    bloodType,
    photo: photoUrl,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

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
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken"); // Exclude password and refreshToken
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Send back the user data including the photo URL
  res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});
//updete user
const updatedUser = asyncHandler(async (req, res) => {
  const id=req.params.id

  try {
    const updatedUser=await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
    res.status(200).json({success:true,message:"Successfully update",data:updatedUser})
  } catch (err) {
    res.status(500).json({success:false,message:"failed to update",data:updatedUser})
  }
});
// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const id=req.params.id
  try {
    await User.findByIdAndDelete(id,)
    res.status(200).json({success:true,message:"Delete User Successfully"})
  } catch (err) {
    res.status(500).json({success:false,message:"failed to delete"})
  }
});

const getSingaleUser = asyncHandler(async (req, res) => {
  const id=req.params.id

  try {
    const user = await User.findById(id,)
    res.status(200).json({success:true,message:"User Found",data:user})
  } catch (err) {
    res.status(404).json({success:false,message:"User Not Found"})
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  

  try {
    const users = await User.find({})
    res.status(200).json({success:true,message:"All User Found", data:users})
  } catch (err) {
    res.status(404).json({success:false,message:"User Not Found"})
  }
});


export { registerUser,registerDoctor, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getUserProfile, updatedUser,deleteUser,getSingaleUser,getAllUser };