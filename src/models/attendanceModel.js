// models/attendanceModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bus = require('./busModel');
const Driver = require('./driverModel');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define associations
Attendance.belongsTo(Bus, { foreignKey: 'busId' });
Attendance.belongsTo(Driver, { foreignKey: 'driverId' });
module.exports = Attendance;
