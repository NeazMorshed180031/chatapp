import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {

    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // socket io functionality will continue from here

    //This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    console.log(conversation);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller" + error.message);
    res.status(500).json({ error: "Internal Server Error" + error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const converstaion = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if(!converstaion) return res.status(200).json([])

    const messages = converstaion.messages

    console.log(converstaion)

    res.status(200).json(converstaion.messages)
  } catch (error) {
    console.log("Error in getMessage Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

