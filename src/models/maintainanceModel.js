// models/maintenanceModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bus = require('./busModel'); // Import the Bus model

const Maintenance = sequelize.define('maintenance', {
  maintenanceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

// Define association with Bus
Maintenance.belongsTo(Bus, { foreignKey: 'busId'});

module.exports = Maintenance;
