const LostAndFoundMaterial = require('../models/lostModel');
const Bus = require('../models/busModel'); // Import the Bus model

// CRUD operations
exports.createMaterial = async (req, res, next) => {
  try {
    const { itemName, description, contactPerson, contactEmail, contactPhone, busId } = req.body;
    const newMaterial = await LostAndFoundMaterial.create({
      itemName,
      description,
      contactPerson,
      contactEmail,
      contactPhone,
      busId // Assuming busId is provided in the request body
    });
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error('Error creating Lost and Found material:', error);
    next(error);
  }
};

exports.getAllMaterials = async (req, res, next) => {
  try {
    const materials = await LostAndFoundMaterial.findAll({
      include: {
        model: Bus, // Include the Bus model
        as: 'bus' // Alias for the association
      }
    });
    res.json(materials);
  } catch (error) {
    next(error);
  }
};

exports.getMaterialById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const material = await LostAndFoundMaterial.findByPk(id, {
      include: {
        model: Bus,
        as: 'bus'
      }
    });
    if (!material) {
      res.status(404).json({ error: 'Lost and Found material not found.' });
    } else {
      res.json(material);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateMaterial = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedMaterial] = await LostAndFoundMaterial.update(req.body, {
      where: { materialId: id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Lost and Found material not found.' });
    } else {
      res.json(updatedMaterial[0]);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteMaterial = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await LostAndFoundMaterial.destroy({
      where: { materialId: id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: 'Lost and Found material not found.' });
    } else {
      res.json({ message: 'Lost and Found material deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
