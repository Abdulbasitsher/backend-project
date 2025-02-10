import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINRAY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinay = async (localFilePath) => { 
    try {
        if(!localFilePath) return null;
        const reponse = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        })  
        return reponse;}
    catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export default uploadOnCloudinay;