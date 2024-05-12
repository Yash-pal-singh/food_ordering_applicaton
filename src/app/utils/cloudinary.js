import { rejects } from "assert";
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET,
})

export const uploadImage=async(file,folder)=>{
    const buffer=await file.arrayBuffer();
    const bytes=Buffer.from(buffer);
    return new Promise((resolve,rejected)=>{
        cloudinary.uploader.upload_stream({
            resource_type:'auto',
            folder:folder,
        }, async(err,result)=>{
            if(err) rejected(err.message);
            else resolve(result);
        }
        ).end(bytes);
    });
}

export const deleteImage=async(public_id)=>{
    return new Promise(async(resolve,rejected)=>{
        try{
            const result=await cloudinary.uploader.destroy(public_id);
            return resolve(result); 
        }catch(error)
        {
            rejected(error.message);
        }     
    })
}