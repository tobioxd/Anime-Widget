const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Conversation must have participants"],
        },
    ],
    messages: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
    
},{timestamps: true}
, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;