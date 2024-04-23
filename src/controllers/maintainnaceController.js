const Maintenance = require('../models/maintainanceModel');
const Bus = require('../models/busModel');

// CRUD operations
exports.createMaintenance = async (req, res, next) => {
     try {
       const newMaintenance = await Maintenance.create({ ...req.body, busId: req.body.busId });
       res.status(201).json({ success: true, message: 'Maintenance record created successfully', data: newMaintenance });
     } catch (error) {
       console.error('Error creating Maintenance:', error);
       next(error);
     }
   };

   exports.updateMaintenance = async (req, res, next) => {
     const { id } = req.params;
     try {
       const [updatedRowsCount, updatedMaintenance] = await Maintenance.update(
         { ...req.body, busId: req.body.busId },
         {
           where: { maintenanceId: id },
           returning: true,
         }
       );
       if (updatedRowsCount === 0) {
         res.status(404).json({ success: false, error: 'Maintenance record not found.' });
       } else {
         res.json({  data: updatedMaintenance[0] });
       }
     } catch (error) {
       next(error);
     }
   };
// Get all maintenance records
exports.getAllMaintenance = async (req, res, next) => {
  try {
    const maintenanceRecords = await Maintenance.findAll({ include: Bus });
    res.json(maintenanceRecords);
  } catch (error) {
    next(error);
  }
};


// Get maintenance record by ID
exports.getMaintenanceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const maintenanceRecord = await Maintenance.findByPk(id, { include: Bus });
    if (!maintenanceRecord) {
      res.status(404).json({ success: false, error: 'Maintenance record not found.' });
    } else {
      res.json( maintenanceRecord);
    }
  } catch (error) {
    next(error);
  }
};


// Delete maintenance record by ID
exports.deleteMaintenance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await Maintenance.destroy({
      where: { maintenanceId: id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ success: false, error: 'Maintenance record not found.' });
    } else {
      res.json({ success: true, message: 'Maintenance record deleted successfully' });
    }
  } catch (error) {
    next(error);
  }
};
