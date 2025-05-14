import { asyncHandler } from "../utilities/asyncHandler.js";
import ApiErrors  from "./../utilities/apiErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer " , "")
        if (!token) {
            throw new ApiErrors(401, "Unauthorized")
        }
    
        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if(!user) {
            throw new ApiErrors(401, "Unauthorized")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiErrors(401, error?.massage || "Unauthorized")
    }

} )