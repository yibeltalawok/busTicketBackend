const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./stationModel');
const BusAssignation = require('./busAssignationModel');
const Bus = require('./busModel');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sourceStationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Station,
      key: 'stationId',
    },
  },
  destinationStationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Station,
      key: 'stationId',
    },
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Bus,
      key: 'id',
    },
  },
  assignId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BusAssignation,
      key: 'id',
    },
  },
  servicePayment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations
Booking.belongsTo(Station, { foreignKey: 'sourceStationId', as: 'sourceStation' });
Booking.belongsTo(Station, { foreignKey: 'destinationStationId', as: 'destinationStation' });
Booking.belongsTo(BusAssignation, { foreignKey: 'assignId', as: 'assignedBus' });
Booking.belongsTo(Bus, { foreignKey: 'busId', as: 'bus' });


module.exports = Booking;
