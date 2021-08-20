const Chat = require("../models/chat");
const mongoose = require("mongoose");

const createChat = async (req, res) => {
  const { userOne, userTwo, nameChat,nameChatTwo} = req.body;
  try {
    const newChat = new Chat({ userOne, userTwo, message: [], nameChat });
    const savedChat = await newChat.save();
    res.send({ message: "Buenas" });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const addMessage = async (req, res) => {
  const { id, user, message } = req.body;
  let newDate = "";
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    newDate = `${day}-0${month}-${year}`;
  } else {
    newDate = `${day}-${month}-${year}`;
  }
  try {
    const findChat = await Chat.findOne({ _id: id });
    findChat.message.push({ user: user, message: message, date: newDate });
    const savedChat = await findChat.save();
    res.send(savedChat);
  } catch (error) {
    res.send(error.message);
  }
};

const getChat = async (req, res) => {
  const { id } = req.params;
  try {
    const findChat = await Chat.find({
      $or: [{ userOne: id }, { userTwo: id }],
    });
    const chats = findChat.map((chat) => {
      return {
        chatId: chat._id,
        id: chat.userOne === id ? chat.userTwo : chat.userOne,
        messages: chat.message,
        nameChat: chat.nameChat,
        nameChatTwo: chat.nameChatTwo
      };
    });
    res.send(chats);
  } catch (error) {
    res.send(error.message);
  }
};

const getMessages = async (req,res) => {
    const {id} = req.params;
    try {
        const messages = await Chat.findOne({_id:id})
        console.log(messages)
        res.send(messages);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = { createChat, addMessage, getChat, getMessages};
