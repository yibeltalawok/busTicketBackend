const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bus = require('./busModel');
const Driver = require('./driverModel');

const Accident = sequelize.define('Accident', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  place: {
     type: DataTypes.TEXT,
     allowNull: false,
   },
   type: {
     type: DataTypes.TEXT,
     allowNull: false,
   },
  accidentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Add other fields as needed
});

// Define associations
Accident.belongsTo(Bus, { foreignKey: 'busId' });
Accident.belongsTo(Driver, { foreignKey: 'driverId' });

module.exports = Accident;
