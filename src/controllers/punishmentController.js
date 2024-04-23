// controllers/punishmentController.js
const Punishment = require('../models/punishmentModel');
const Bus = require('../models/busModel');
const Driver = require('../models/driverModel');
const PenaltyCategory = require('../models/penalityCategoryModel');

exports.getAllPunishments = async (req, res, next) => {
  try {
    const punishments = await Punishment.findAll(
{
  include: [Bus, Driver,PenaltyCategory],
}

    );
    res.json(punishments);
  } catch (error) {
    next(error);
  }
};

exports.getPunishmentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const punishment = await Punishment.findByPk(id, {
      include: [Bus, Driver,PenaltyCategory],
    });

    if (!punishment) {
      res.status(404).json({ error: 'Punishment not found.' });
    } else {
      res.json(punishment);
    }
  } catch (error) {
    next(error);
  }
};

exports.createPunishment = async (req, res, next) => {
  const { busId, driverId, description, amount, date, frequency,catagoryId,type,level } = req.body;
  try {
    const newPunishment = await Punishment.create({
      busId,
      driverId,
      description,
      amount,
      date,
      frequency,
      catagoryId,
      type,level
    });

    // Fetch associated Bus and Driver data
    const bus = await Bus.findByPk(busId);
    const driver = await Driver.findByPk(driverId);

    // Attach Bus and Driver data to the punishment response
    const punishmentWithDetails = {
      ...newPunishment.toJSON(),
      Bus: bus ? bus.toJSON() : null,
      Driver: driver ? driver.toJSON() : null,
    };

    res.status(201).json(punishmentWithDetails);
  } catch (error) {
    next(error);
  }
};

exports.updatePunishment = async (req, res, next) => {
  const { id } = req.params;
  const { busId, driverId, description, amount, date,frequency ,catagoryId,type,level} = req.body;
  try {
    const punishment = await Punishment.findByPk(id);
    if (!punishment) {
      res.status(404).json({ error: 'Punishment not found.' });
    } else {
      await punishment.update({ busId, driverId, description, amount, date,frequency ,catagoryId,type,level });
      res.json(punishment);
    }
  } catch (error) {
    next(error);
  }
};

exports.deletePunishment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const punishment = await Punishment.findByPk(id);
    if (!punishment) {
      res.status(404).json({ error: 'Punishment not found.' });
    } else {
      await punishment.destroy();
      res.status(204).json({ message: 'Punishment deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
