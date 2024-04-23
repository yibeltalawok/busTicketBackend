const Attendance = require('../models/attendanceModel');
const Bus = require('../models/busModel');
const Driver = require('../models/driverModel');

exports.getAllAttendance = async (req, res, next) => {
  try {
    const attendances = await Attendance.findAll({
      include: [Bus, Driver],
    });
    res.json(attendances);
  } catch (error) {
    next(error);
  }
};

exports.getAttendanceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByPk(id, {
      include: [Bus, Driver],
    });
    if (!attendance) {
      res.status(404).json({ error: 'Attendance not found.' });
    } else {
      res.json(attendance);
    }
  } catch (error) {
    next(error);
  }
};

exports.createAttendance = async (req, res, next) => {
  const { busId, driverId, date } = req.body;
  try {
    const newAttendance = await Attendance.create({ busId, driverId, date });
    res.status(201).json({ success: true, data: newAttendance });
  } catch (error) {
    next(error);
  }
};

exports.updateAttendance = async (req, res, next) => {
  const { id } = req.params;
  const { busId, driverId, date } = req.body;
  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      res.status(404).json({ error: 'Attendance not found.' });
    } else {
      await attendance.update({ busId, driverId, date });
      res.json({ success: true, data: attendance });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      res.status(404).json({ error: 'Attendance not found.' });
    } else {
      await attendance.destroy();
      res.json({ success: true, message: 'Attendance deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
