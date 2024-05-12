import { NextResponse } from "next/server";
import { Category } from "../../models/Category";
import mongoose from 'mongoose';

export async function POST(req){
    await mongoose.connect(process.env.MONGO_URL);
   const {name}=await req.json();
   const categoryDoc=await Category.create({name});
   return NextResponse.json(categoryDoc);
}

export async function GET(){
    await mongoose.connect(process.env.MONGO_URL);
    return NextResponse.json(await Category.find());
}

export async function PUT(req){
    await mongoose.connect(process.env.MONGO_URL);
    const {_id,name}=await req.json();
    await Category.updateOne({_id},{name});
    return NextResponse.json(true);
}

export async function DELETE(req){
    await mongoose.connect(process.env.MONGO_URL);
    const url=new URL(req.url);
    const _id=url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return NextResponse.json(true);
}