import { asyncHandler }  from './../utilities/asyncHandler.js';
import ApiErrors from './../utilities/apiErrors.js';
import { User } from '../models/User.models.js';
import {uploadOnCloudinary} from './../utilities/cloudinary.js';
import { ApiResponse } from '../utilities/ApiResponse.js';
import fs from 'fs';

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, password, email, userName } = req.body;

    if ([fullName, password, email, userName].some((field) => field?.trim() === "")) {
        throw new ApiErrors(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser) {
        throw new ApiErrors(409, "User with email or username already exists");
    }

    // Handle avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiErrors(400, "Avatar image is required");
    }

    // Handle cover image safely
    let coverImageLocalPath;
    if (req.files?.coverImage?.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    // Verify file exists locally
    if (!fs.existsSync(avatarLocalPath)) {
        throw new ApiErrors(400, "Avatar file not found on server");
    }

    // Upload to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    if (!avatar) {
        throw new ApiErrors(500, "Cloudinary avatar upload failed");
    }

    // Create user
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        userName: userName.toLowerCase(),
        email,
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiErrors(500, "Error while creating user");
    }

    return res.status(201).json(new ApiResponse(201, "User created", createdUser));
});
export {registerUser};