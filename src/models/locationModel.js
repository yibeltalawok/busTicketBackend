// models/userLocationModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserLocation = sequelize.define('UserLocation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  phone: {
     type: DataTypes.FLOAT,
     allowNull: false
   },
  // Add other fields as needed
});

module.exports = UserLocation;
