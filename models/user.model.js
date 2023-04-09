import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 1,
        maxlenght: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
        minlength: 0,
        maxlenght: 200
    },
    isAdmin:{
        type: Boolean,
        default:false
    }
},{timestamp: true});


let User = mongoose.model("user", UserSchema);

export default User;
