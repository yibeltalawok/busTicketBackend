// controllers/associationController.js
const Association = require('../models/assocationModel'); // Assuming the correct model name
const logError = (operation, error) => {
     console.error(`Error ${operation} Association:`, error);
   };
// CRUD operations
exports.createAssociation = async (req, res, next) => {
  try {
    const newAssociation = await Association.create(req.body);
    res.status(201).json(newAssociation);
  } catch (error) {
    console.error('Error creating Association:', error);
    next(error);
  }
};

// Get all Associations
exports.getAllAssociations = async (req, res, next) => {
  try {
    const associations = await Association.findAll();
    res.json(associations);
  } catch (error) {
    next(error);
  }
};

// Get Association by ID
exports.getAssociationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const association = await Association.findByPk(id);
    if (!association) {
      res.status(404).json({ error: 'Association not found.' });
    } else {
      res.json(association);
    }
  } catch (error) {
    next(error);
  }
};

// Update Association by ID
exports.updateAssociation = async (req, res, next) => {
     const { id } = req.params;
     try {
       const [updatedRowsCount, updatedAssociations] = await Association.update(req.body, {
         where: { associationId : id}, // Check if it's 'associationId ' or 'AssocationId'
         returning: true,
       });
       if (updatedRowsCount === 0) {
         res.status(404).json({ error: 'Association not found.' });
       } else {
         res.json(updatedAssociations[0]);
       }
     } catch (error) {
       logError('updating', error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };

   // Delete Association by ID
   exports.deleteAssociation = async (req, res, next) => {
     const { id } = req.params;
     try {
       const deletedRowsCount = await Association.destroy({
         where: { associationId : id }, // Check if it's 'associationId ' or 'AssocationId'
       });
       if (deletedRowsCount === 0) {
         res.status(404).json({ error: 'Association not found.' });
       } else {
         res.json({ message: 'Association deleted successfully.' });
       }
     } catch (error) {
       logError('deleting', error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };