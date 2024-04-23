// controllers/communicationController.js
const Communication = require('../models/communicationModel');

// CRUD operations
exports.sendMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = await Communication.create({ senderId, receiverId, message });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    next(error);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Communication.findAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

exports.getMessageById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const message = await Communication.findByPk(id);
    if (!message) {
      res.status(404).json({ error: 'Message not found.' });
    } else {
      res.json(message);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedMessage] = await Communication.update(req.body, {
      where: { messageId: id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Message not found.' });
    } else {
      res.json(updatedMessage[0]);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await Communication.destroy({
      where: { messageId: id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: 'Message not found.' });
    } else {
      res.json({ message: 'Message deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
