import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

dotenv.config();



export const login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).send({message:"Invalid Email", status:"warning"});
        }else{
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(200).send({message:`Incorrect Password!`, status:"warning"});
            }
            let token = jwt.sign({user_id:user._id, email: user.email},process.env.JWT_SECRET);
            return res.status(200).send({token:`Bearer ${token}`,details: user, message: "Login Successful!", status:"success"});
        }
        
        
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during Login", status:"error"});
    }
}

export const register = async (req,res) => {
    try{
        const {name, email ,password, bio, isAdmin} = req.body;
        console.log(req.body);
        
        let user = await User.find({email});
        if(user._id){
            return res.status(200).send({message: "User already exists! Please try to login", status:"info"})
        }
        const newUser = new User({
            name,
            email,
            password, 
            bio, 
            isAdmin
        });
        
        const salt = await bcrypt.genSalt(10);
        console.log(password,salt);
        newUser.password = await bcrypt.hash(password,salt);
        await newUser.save();
        return res.status(200).send({message:"Registered Successfully", details:newUser, status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during Signup", status:"error"});
    }
}

export const getUser = async ( req,res )=>{
    try{
        let {id} = req.params;
        let user = await User.findById(id);
        if(!user._id){
            res.status(200).send({message:"User not found!", status:"error"});
        }
        res.status(200).send({details:user, message: "Successfully retrieved user data", status:"success"});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while fetching user details", status:"error"});
    }
}

export const updateUser = async ( req,res )=>{
    try{
        let {id} = req.params;
        let data = req.body;
        let user = await User.findById(id);
        if(!user._id){
            res.status(200).send({message:"User not found!", status:"error"});
        }
        if(data.name && data.bio){
            user.name = data.name;
            user.bio = data.bio;
        }else if(data.name){
            user.name = data.name;
        }else if(data.bio){
            user.bio = data.bio;
        }
        await user.save();
        res.status(200).send({details:user, message:"Successfully Updated!", status:"success"});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while updating user data", status:"error"});
    }
}

export const deleteUser = async ( req,res )=>{
    try{
        let {id} = req.params;
        let user = await User.findByIdAndDelete(id);
        if(!user._id){
            res.status(200).send({message:"User not found!", status:"error"});
        }
        res.status(200).send({message:"Successfully Deleted!", status:"success"});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while updating user data", status:"error"});
    }
}

export const getAllUsers = async(req,res)=>{
    try{
        let users = await User.find();
        res.status(200).send({details: users, message:"Successfully Fetched all users!", status:"success"});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while fetching all users", status:"error"});
    }
}

export const decodeToken = async ( req,res )=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({details:decode});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while fetching user details", status:"error"});
    }
}