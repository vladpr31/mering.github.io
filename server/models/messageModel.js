const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderType: String,
  receiverType: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
