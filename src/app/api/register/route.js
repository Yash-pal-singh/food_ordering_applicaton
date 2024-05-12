import { User } from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const body=await req.json();
    const password=body.password;
    if(!password?.length || password.length<5)
    {
        new Error("password must be at least 5 character");
    }
    const salt=bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(password,salt);
    body.password=hashedPassword;
    const createdUser=await User.create(body);
    return Response.json(createdUser)   
}