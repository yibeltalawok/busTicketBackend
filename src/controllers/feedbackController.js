// feedbackController.js
const Feedback = require('../models/feedbackModel');

exports.getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      res.status(404).json({ error: 'Feedback not found.' });
    } else {
      res.json(feedback);
    }
  } catch (error) {
    next(error);
  }
};

exports.createFeedback = async (req, res, next) => {
  const { name,phone, comment } = req.body;
  try {
    const newFeedback = await Feedback.create({ name,phone, comment });
    res.status(201).json(newFeedback);
  } catch (error) {
    next(error);
  }
};

exports.updateFeedback = async (req, res, next) => {
  const { id } = req.params;
  const { phone,name, comment } = req.body;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      res.status(404).json({ error: 'Feedback not found.' });
    } else {
      await feedback.update({phone,name, comment });
      res.json(feedback);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteFeedback = async (req, res, next) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      res.status(404).json({ error: 'Feedback not found.' });
    } else {
      await feedback.destroy();
      res.json({ message: 'Feedback deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
