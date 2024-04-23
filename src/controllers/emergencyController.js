// controllers/emergencyContactController.js
const EmergencyContact = require('../models/emergencyModel');

exports.getAllEmergencyContacts = async (req, res, next) => {
  try {
    const emergencyContacts = await EmergencyContact.findAll();
    res.json(emergencyContacts);
  } catch (error) {
    next(error);
  }
};

exports.getEmergencyContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const emergencyContact = await EmergencyContact.findByPk(id);
    if (!emergencyContact) {
      res.status(404).json({ error: 'Emergency contact not found.' });
    } else {
      res.json(emergencyContact);
    }
  } catch (error) {
    next(error);
  }
};

exports.createEmergencyContact = async (req, res, next) => {
  const { contactName, contactNumber, address } = req.body;
  try {
    const newEmergencyContact = await EmergencyContact.create({ contactName, contactNumber, address });
    res.status(201).json(newEmergencyContact);
  } catch (error) {
    next(error);
  }
};

exports.updateEmergencyContact = async (req, res, next) => {
  const { id } = req.params;
  const { contactName, contactNumber, address } = req.body;
  try {
    const emergencyContact = await EmergencyContact.findByPk(id);
    if (!emergencyContact) {
      res.status(404).json({ error: 'Emergency contact not found.' });
    } else {
      await emergencyContact.update({ contactName, contactNumber, address });
      res.json(emergencyContact);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteEmergencyContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const emergencyContact = await EmergencyContact.findByPk(id);
    if (!emergencyContact) {
      res.status(404).json({ error: 'Emergency contact not found.' });
    } else {
      await emergencyContact.destroy();
      res.status(204).json({ message: 'Emergency contact deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
