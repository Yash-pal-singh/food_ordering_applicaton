import mongoose from 'mongoose';
import {MenuItem} from "@/app/models/MenuItem";  
import { NextResponse } from 'next/server';
import { deleteImage } from "@/app/utils/cloudinary";


export async function POST(req){
        const data=await req.json();
        await mongoose.connect(process.env.MONGO_URL);
        const menuItemDoc=await MenuItem.create(data);
        return NextResponse.json(menuItemDoc);
}

export async function GET(req){
    await mongoose.connect(process.env.MONGO_URL);
    return NextResponse.json(await MenuItem.find())
}

export async function PUT(req){
    const {_id,...data}=await req.json();
    console.log(data);
    await mongoose.connect(process.env.MONGO_URL);
    console.log(data)
    await MenuItem.findByIdAndUpdate(_id,data);
    return NextResponse.json(true);
}

export async function DELETE(req)
{
    const r=await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});
    if(r?.public_id)
    {
        await deleteImage(r.public_id);
    }
    return NextResponse.json(true);
}