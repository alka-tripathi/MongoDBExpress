const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLength: 50
    },
    image: {
        type: String, // Store the image as a URL
        required: false
    }
});

const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;
