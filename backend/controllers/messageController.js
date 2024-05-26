const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

exports.sendMessage = async (req, res, next) => {
    try {
        const {message} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId: reciverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await newMessage.save();
        // await conversation.save();

        // this is a better way to save multiple documents in one go
        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(200).json(newMessage);
    } catch (err) {
        console.log(err.message);
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user.id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (err) {
        console.log(err.message);
    }
}