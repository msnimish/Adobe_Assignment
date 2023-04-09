import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export let totalUsers = async (req,res)=>{
    try{
        let noOfUsers = await User.countDocuments();
        return res.status(200).send({details:noOfUsers, message:"Successfully retrieved total  no. of users", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while retrieving total no. of users", status:"error"});
    }
}

export let mostActiveUsers = async (req,res)=>{
    try{
        let pipeline = [{$group:{_id:"$user_id", totalPosts: {$count: {}}}},{$sort:{totalPosts:-1}},{$limit:5}]
        let users = await Post.aggregate(pipeline);
        return res.status(200).send({details:users, message:"Successfully retrieved top 5 active users", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while retrieving most active users", status:"error"});
    }
}


export let totalPosts = async (req,res)=>{
    try{
        let noOfPosts = await Post.countDocuments();
        return res.status(200).send({details:noOfPosts, message:"Successfully retrieved total  no. of posts", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while retrieving total no. of posts", status:"error"});
    }
}

export let mostLikedPosts = async (req,res)=>{
    try{
        let posts = await Post.find().sort({likes:-1}).limit(5);
        return res.status(200).send({details:posts, message:"Successfully retrieved total  no. of users", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during post deletion", status:"error"});
    }
}