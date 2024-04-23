// models/punishmentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bus = require('./busModel');
const Driver = require('./driverModel');
const PenalityModel=require('./penalityCategoryModel');

const Punishment = sequelize.define('Punishment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  frequency: {
     type: DataTypes.INTEGER,
     allowNull: false,
   },
   type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other fields as needed
});

// Define associations
Punishment.belongsTo(PenalityModel, { foreignKey: 'catagoryId' });
Punishment.belongsTo(Bus, { foreignKey: 'busId' });
Punishment.belongsTo(Driver, { foreignKey: 'driverId' });
module.exports = Punishment;
