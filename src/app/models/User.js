import {Schema, model, models} from 'mongoose';

const userSchema=new Schema({
    image:{type:String},
    public_id:{type:String,default:''},
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,},
    phone:{type:String,},
    postalCode:{type:String,},
    city:{type:String,},
    streetAddress:{type:String,},
    country:{type:String,},
    admin:{type:Boolean,default:false},
},
    {timestamps:true});
export const User=models?.User || model("User",userSchema);
