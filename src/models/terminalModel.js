// models/RouteModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./stationModel');
const Route = sequelize.define('Route', {
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
  asphaltDistance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  graveDistance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  servicePayment: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
//Define associations
Route.belongsTo(Station, { foreignKey: 'sourceStationId', as: 'sourceStation' });
Route.belongsTo(Station, { foreignKey: 'destinationStationId', as: 'destinationStation' });

module.exports = Route;


