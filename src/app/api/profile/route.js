import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { User } from "@/app/models/User";  
import { deleteImage } from "@/app/utils/cloudinary";


export async function PUT(req){
    await mongoose.connect(process.env.MONGO_URL);
    const session=await getServerSession(authOptions);
    const email=session.user.email;
    const data=await req.json();
    const _id=data._id;
    if(!_id || data.email===email)
    {
        if(session.user.public_id && session.user.public_id!==data.public_id)
            {
                await deleteImage(session.user.public_id);
            }
           await User.updateOne({email},data);
    }
        else
        {
        const user=await User.findByIdAndUpdate(_id,data,{new:true})
        console.log(user);
        }
    return NextResponse.json(true);
}       

export async function GET(){
    await mongoose.connect(process.env.MONGO_URL);
    const session=await getServerSession(authOptions);
    const email=session?.user?.email;
    if(!email)
    {
        return NextResponse.json({});
    }
    const user=await User.findOne({email});
    return NextResponse.json({user});
}