import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";

export let createPost = async (req,res)=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        let user_id = decode.user_id;
        const {content} = req.body;
        const newPost = new Post({user_id, content});
        await newPost.save();
        return res.status(200).send({message:"Post created Successfully", details:newPost, status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during post creation", status:"error"});
    }
}

export let getPost = async (req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id);
        return res.status(200).send({details:post, message:"Post details retrieved Successfully!", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during fetching post data", status:"error"});
    }
}

export let updatePost = async (req,res)=>{
    try{
        const {content} = req.body;
        const {id} = req.params;
        let post = await Post.findByIdAndUpdate(id, {content:content});
        return res.status(200).send({details:post, message:"Post updated Successfully", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during post updation", status:"error"});
    }
}

export let deletePost = async (req,res)=>{
    try{
        const {id} = req.params;
        let post = await Post.findByIdAndDelete(id);
        return res.status(200).send({message:"Post deleted Successfully", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during post deletion", status:"error"});
    }
}

export let incrementLike = async (req,res)=>{
    try{
        const {user_id} = req.body;
        const {id} = req.params;
        let post = await Post.findById(id);
        if(post.usersDisliked.includes(user_id)){
            post.usersDisliked=post.usersDisliked.filter(userId=>userId===user_id);
            post.likes+=2;
        }else{
            post.likes++;
        }
        post.usersLiked.push(user_id);
        await post.save();
        return res.status(200).send({message:"Like incremented Successfully", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during incrementing post likes", status:"error"});
    }
}

export let decrementLike = async (req,res)=>{
    try{
        const {user_id} = req.body;
        const {id} = req.params;
        let post = await Post.findById(id);
        if(post.likes>0){
            if(post.usersLiked.includes(user_id)){
                post.usersLiked=post.usersLiked.filter(userId=>userId===user_id);
                post.likes-=2;
                if(post.likes<0){
                    post.likes=0;
                }
            }else{
                post.likes--;
            }
            post.usersDisliked.push(user_id);
            await post.save();
        }
        return res.status(200).send({message:"Like decremented Successfully", status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during decrementing post likes", status:"error"});
    }
}