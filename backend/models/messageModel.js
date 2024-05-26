const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Message must have a sender"],
    },
    receiverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Message must have a receiver"],
    },
    message: {
        type: String,
        required: [true, "Message can not be empty"],
    },
    // createdAt: , updateAt 
},{timestamps: true}
, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Message = mongoose.model("Message", messageSchema);   

module.exports = Message;