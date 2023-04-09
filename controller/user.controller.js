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
            let token = jwt.sign({_id:user._id, email: user.email},process.env.JWT_SECRET);
            return res.status(200).send({token:`Bearer ${token}`, message: "Login Successful!", status:"success"});
        }
        
        
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during Login", status:"error"});
    }
}

export const register = async (req,res) => {
    try{
        const {email,password} = req.body;
        console.log(req.body);
        let user = await User.find({email});
        if(user._id){
            return res.status(200).send({message: "User already exists! Please try to login", status:"info"})
        }
        const newUser = new User({
            email,
            password
        });
        
        const salt = await bcrypt.genSalt(10);
        console.log(password,salt);
        newUser.password = await bcrypt.hash(password,salt);
        await newUser.save();
        return res.status(200).send({message:"Registered Successfully", data:newUser, status:"success"});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong during Signup", status:"error"});
    }
}

export const getUser = async ( req,res )=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({user:decode});
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while fetching user details", status:"error"});
    }
}

export const getBannedUser = async ( req,res )=>{
    try{
        let users = await User.find({blockedTill:{$ne:null}}).sort({blockedTill:1}).limit(3);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({message: "Something went wrong while fetching user details", status:"error"});
    }
}
