const mongoose = require('mongoose');

const Chat = require('./models/chats.js');
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Telegram');
  }

main().then((res)=>{
    console.log("connection is successfull");
})
.catch((err)=>{
    console.log("Error is:"+err);
});

let allchats=[
    {
        name:"Alka Tripathi",
        message:"Hey! I am at my nani' house",
        image:"/Photos/photo4.png"
    },
    {
        name:"Kush",
        message:"i am jack!!",
        image:"/Photos/photo5.jpeg",
        
    },
    {
        name:"Ashnaya",
        message:"In Delhi",
        image:"/Photos/images.jpeg",
    }
];

Chat.insertMany(allchats);
Chat.find()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err.errors.category.properties,message);
})