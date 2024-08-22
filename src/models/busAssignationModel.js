// models/busAssignationModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bus = require('./busModel');
const Route = require('./terminalModel');

const BusAssignation = sequelize.define('BusAssignation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  routeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Route,
      key: 'id',
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
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  destinationStationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sourceStationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define associations
BusAssignation.belongsTo(Route, { foreignKey: 'routeId', as: 'route' });
BusAssignation.belongsTo(Bus, { foreignKey: 'busId', as: 'bus' });

module.exports = BusAssignation;
