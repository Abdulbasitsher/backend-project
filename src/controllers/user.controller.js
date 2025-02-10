import { asyncHandler }  from './../utilities/asyncHandler.js';
import ApiErrors from './../utilities/apiErrors.js';
import { User } from '../models/User.models.js';
import uploadOnCloudinay from './../utilities/cloudinary.js';
import { ApiResponse } from '../utilities/ApiResponse.js';

const registerUser = asyncHandler( async (req , res) => {
    res.status(200).json({
        massege: "ok"
    }) 
    const {fullName ,password , email , name} = req.body

    if ([fullName ,password , email , name].some( (field) => field?.trim() === "" ) 
    ){
        throw new ApiErrors(400, "all fields are  required")
    }

    const existedUser = User.findOne({
        $or: [{userName},{email}]
    })

    if (existedUser) {
        throw new ApiErrors(409, "User with email or username alredy existed")
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coveImage[0]?.path;

    if(!avatarLocalPath ){
        throw new ApiErrors(400, "avatar image are required")
    }

    const avatar = await uploadOnCloudinay(avatarLocalPath);
    const coverImage = await uploadOnCloudinay(coverImageLocalPath);

    if (!avatar ) {
        throw new ApiErrors(500, "cloudinary error")
    }

    const user = await User.create({
        fullName, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "", 
        password,
        userName: userName.toLoverCase(),
        email,
    })

    const createdUser = await  User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser){
        throw new ApiErrors(500, "error while creating user")
    }

    return res.status(201),json(new ApiResponse(201, "User created", createdUser))
})

export {registerUser};