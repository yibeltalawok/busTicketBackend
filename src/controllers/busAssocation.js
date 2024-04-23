const Association = require('../models/associationModel');

// Add error handling and validation as needed
// Example: You can use express-validator for validation

// Create Association
exports.createAssociation = async (req, res) => {
  try {
    const association = await Association.create(req.body);
    res.status(201).json(association);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Associations
exports.getAllAssociations = async (req, res) => {
  try {
    const associations = await Association.findAll();
    res.status(200).json(associations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other CRUD operations for Association...

