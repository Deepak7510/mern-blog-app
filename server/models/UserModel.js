import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    bio:{
        type:String,
        trim:true
    },
    avatar:{
        type:String,
        trim:true
    }
},{ timestamps: true });

const UserModel=mongoose.model('User',userSchema);

export default UserModel;