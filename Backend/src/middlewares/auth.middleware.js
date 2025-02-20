// import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
// import { User } from "../models/UserSchema.js";


// JWT Verification Middleware
export const verifyJWT = asyncHandler(async (req, res, next) => {
  // try {
  //   // Extract token from HTTP-only cookies or Authorization header
  //   let token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  //   if (!token) {
  //     throw new ApiError(401, "Unauthorized request. No token provided.");
  //   }

  //   // Verify the token
  //   let decoded;
  //   try {
  //     decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //     // 67a54188fb279b9e83a43cd8
  //     console.log(decoded)
  //   } catch (error) {
  //     if (error.name === "TokenExpiredError") {
  //       throw new ApiError(401, "Token has expired. Please log in again.");
  //     } else if (error.name === "JsonWebTokenError") {
  //       throw new ApiError(401, "Invalid token. Authentication failed.");
  //     } else {
  //       throw new ApiError(401, "Could not verify token.");
  //     }
  //   }

  //   // Fetch user from the database using decoded token ID
  //   const user = await User.findById(decoded.id).select("-password -refreshToken");
  //   console.log(user)
  //   if (!user) {
  //     throw new ApiError(401, "User not found or invalid token.");
  //   }

  //   // Attach user data to the request object
  //   req.user = user;

  //   next(); // Proceed to the next middleware or route handler
  // } catch (error) {
  //   next(error);
  // }
  const token = req.headers.Authorization;
  console.log(token);
  
  if(!token || token.startsWith("Bearer")){
    return res.status(401).json({success:false, message:"No token, authorization token"})
  }

  try {
    const authtoken = token.split(" ")[1];
    const decoded = jwt.verify(authtoken, process.env.process.env.ACCESS_TOKEN_SECRET) 
    req.userId=decoded.id;
    req.role=decoded.role
    next();
  } catch (err) {
    if(err.name==="TokenExpiredError"){
      return res.status(401).json({message:"Token Expired"})
    }
    return res.status(401).json({success:false,message:"Invalid Token"})
  }
});
