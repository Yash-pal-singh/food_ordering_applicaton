import { NextResponse } from "next/server";
import { deleteImage, uploadImage } from "../../utils/cloudinary";
import mongoose from "mongoose";

export async function POST(req){
    const formData=await req.formData();
    const image=formData.get("image");
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const uploadedImage=await uploadImage(image,"food_ordering");
        return NextResponse.json(uploadedImage);
    }catch(error)
    {
        return NextResponse.json({msg:"Image cannot uploaded",success:false},{status:500});
    }
}