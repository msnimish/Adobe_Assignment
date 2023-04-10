import mongoose from "mongoose";

let PostSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: "user", 
        required: true
    },
    content:{
        type: String,
        minlength: 1,
        maxlenght: 300,
        required: true
    },
    likes:{
        type: Number,
        default:0
    },
    usersLiked:{
        type: [mongoose.Types.ObjectId],
        default: []
    },
    usersDisliked:{
        type: [mongoose.Types.ObjectId],
        default: []
    }
},{timestamps: true});


let Post = mongoose.model("post", PostSchema);

export default Post;
