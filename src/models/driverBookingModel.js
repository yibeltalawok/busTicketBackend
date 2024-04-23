const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./stationModel');
const Driver = require('./driverModel');

const DriverBooking = sequelize.define('DriverBooking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  },
});

// Define associations with explicitly specified foreign key names
DriverBooking.belongsTo(Station, { foreignKey: 'stationId' });
DriverBooking.belongsTo(Driver, { foreignKey: 'driverId' });

module.exports = DriverBooking;
