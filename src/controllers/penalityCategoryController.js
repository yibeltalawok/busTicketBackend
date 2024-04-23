const PenaltyCategory = require('../models/penalityCategoryModel');

// Create a new penalty category
exports.createPenaltyCategory = async (req, res) => {
    try {
        const penaltyCategory = await PenaltyCategory.create(req.body);
        res.status(201).json({
          penaltyCategory
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all penalty categories
exports.getAllPenaltyCategories = async (req, res) => {
    try {
        const penaltyCategories = await PenaltyCategory.findAll();
        res.status(200).json({

                penaltyCategories

        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get a single penalty category by ID
exports.getPenaltyCategory = async (req, res) => {
    try {
        const penaltyCategory = await PenaltyCategory.findByPk(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                penaltyCategory
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a penalty category
// Update a penalty category
exports.updatePenaltyCategory = async (req, res) => {
     try {
         const penaltyCategoryId = req.params.id;
         const { name, description, penaltyAmount } = req.body;

         // Find the penalty category by ID
         const penaltyCategory = await PenaltyCategory.findByPk(penaltyCategoryId);

         // If the penalty category is found, update its properties
         if (penaltyCategory) {
             penaltyCategory.name = name;
             penaltyCategory.description = description;
             penaltyCategory.penaltyAmount = penaltyAmount;
             await penaltyCategory.save(); // Save the changes to the database
             res.status(200).json({
                 status: 'success',
                 message: 'Penalty category updated successfully'
             });
         } else {
             // If the penalty category is not found, return an error
             res.status(404).json({
                 status: 'fail',
                 message: `Penalty category with ID ${penaltyCategoryId} not found`
             });
         }
     } catch (err) {
         res.status(400).json({
             status: 'fail',
             message: err.message
         });
     }
 };


// Delete a penalty category
exports.deletePenaltyCategory = async (req, res) => {
    try {
        await PenaltyCategory.destroy({
            where: { id: req.params.id }
        });
        res.status(204).json({
            status: 'success',
            message: 'Penalty category deleted successfully'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};
