//requiring express
let express=require("express");
const app=express();
const port=8080;

//use to parse the data
app.use(express.urlencoded({ extended: true }));

//for put and delete request
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


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

});


//new button
app.get("/home/new",(req,res)=>{
    // res.send("in form apge");
    res.render("new.ejs");
})

app.post("/home",(req,res)=>{
    let {username,message}=req.body;
    let newchats = new Chat({
        name:username,
        message:message,
    });
    newchats.save().then((res)=>{
      console.log("data is saved");
    })
    .catch((err)=>{
        console.log("error is:" +err);
    })
    res.redirect("/home");
})


//get request to open the message
app.get("/home/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let editchat =  await Chat.findById(id);
    res.render("edit.ejs",{editchat});
});
app.put("/home/:id",async(req,res)=>{
    let {id}=req.params;
    let{newmessage}=req.body;
    console.log(newmessage);

    let chat =  await Chat.findByIdAndUpdate(id,{message:newmessage},{runValidators:true,new:true});
    console.log(chat);
    res.redirect("/home");
})

//delete post
app.delete("/home/:id",async(req,res)=>{
    let {id}=req.params;
    let dchat = await Chat.findByIdAndDelete(id);
    console.log(dchat);
    res.redirect("/home");
})