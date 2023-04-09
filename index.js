import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/db.js";
import user from "./routes/user.routes.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
connection();

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", user);

app.get("/api", (req,res)=>{
    try{
        res.send("Hello World!");
    }catch(e){
        console.log(e.message);
        res.send({message: e.message});
    }
})

let port = process.env.port || 3000;

//serving the client-side code
app.use(express.static(path.join(__dirname,"./client-side/dist")));

app.get("*", (req,res)=>{
    res.sendFile(
        path.join(__dirname,"./client-side/dist/index.html"),
        function (err){
            res.status(500).send(err);
        }
    );
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port} @ http://localhost:${port}`);
})