import jwt from "jsonwebtoken";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";


export const authenticate = async(req, res, next) => {
    try{
        let token = req.headers.authorization.split(' ')[1];
        let {id} = req.params;
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        let post = await Post.findById(id);
        let user = await User.findById(decode.user_id);
        if(post.user_id === user._id || user.isAdmin){
            req.body.user_id = user._id;
            next();
        }else{
            res.status(200).send({message: "You don't have appropriate access permissions", status:"error"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Something went wrong while authentication", status:"error"})
    }
}

export const validate = (req, res, next) => {
    try{
        const {email, password} = req.body;
        let emailRegexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        let passwordRegexPattern = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\-]{8,18}$/
        if(!emailRegexPattern.test(email)){
            return res.status(200).send({message:"Invalid Email Format", status:"error"});
        }
        let validPassword = passwordRegexPattern.test(password)

        if(!validPassword){
            return res.status(200).send({message:"Invalid Password Format", status:"error"});
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Something went wrong while validation", status:"error"})
    }
}