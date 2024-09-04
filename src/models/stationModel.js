// models/stationModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a separate file for database configuration

const Station = sequelize.define('Station', {
  stationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stationName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contactPersonName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  contactPersonEmail: {
    type: DataTypes.STRING(255),
    allowNull: true,
    // validate: {
    //   isEmail: true,
    // },
  },
  contactPersonPhone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
});


module.exports = Station;
