import mongoose, {Document,Schema} from "mongoose";

export interface IUser extends Document {
    name : string;
    email : string;
    password:string;
    role:'user'|'admin';
    createdAt:Date;
}

const userSchema:Schema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

const User = mongoose.model<IUser>('User',userSchema);

export default User;