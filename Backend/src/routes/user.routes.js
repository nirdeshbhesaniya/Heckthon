import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    refreshAccessToken, 
    changeCurrentPassword,
    updatedUser,
    deleteUser,
    getSingaleUser,
    getAllUser, 
    getUserProfile,
    getMyAppointments,
    getDoctorProfile,
    // getCurrentUser, 
    // updateUserAvatar, 
    // updateUserCoverImage, 
    // getUserChannelProfile, 
    // getWatchHistory, 
    // updateAccountDetails
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "photo",
            maxCount: 1
        }
        ]),
        registerUser
    )

router.route("/login").post(loginUser)

// //secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/:id").get(getSingaleUser)
router.route("/").get(getAllUser)
router.route("/:id").put(updatedUser)
router.route("/:id").delete(deleteUser)
router.route("/:id").delete(deleteUser)
router.route("/user/profile").get(verifyJWT,getUserProfile)
router.route("/doctor/profile").get(verifyJWT,getDoctorProfile)
// Ensure this route is correct
router.route("/appointments/my-appointments").get(verifyJWT, getMyAppointments);

// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)

export default router