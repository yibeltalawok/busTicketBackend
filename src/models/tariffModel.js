// models/RouteModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./stationModel');
const Route = require('./terminalModel');

const Tariff = sequelize.define('Tariff', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  terminalId: {
    type: DataTypes.INTEGER,
    references: {
      model: Route,
      key: 'terminalId',
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value1: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  value2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  value3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
//Define associations
Tariff.belongsTo(Route, { foreignKey: 'terminalId', as: 'terminal' });
module.exports = Tariff;


