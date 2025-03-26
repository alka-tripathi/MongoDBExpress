//requiring express
let express=require("express");
const app=express();
const port=8080;

// app.use(express.static("public"));
//requiring views folder for ejs files
const path =require("path");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");

//requiring moongose

const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Telegram');
  }

main().then((res)=>{
    console.log("connection is successfull");
})
.catch((err)=>{
    console.log("Error is:"+err);
});



let Chat = require("./models/chats.js");
app.listen(port,()=>{
    console.log(`${port} is listening`);
});
app.get("/",(req,res)=>{
    res.send("Server is working");
});

//homepage
app.get("/home",async(req,res)=>{
    const chats = await Chat.find();
    res.render("index.ejs",{chats});


})