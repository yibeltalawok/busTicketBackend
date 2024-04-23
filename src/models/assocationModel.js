// models/association.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path based on your project structure

const association = sequelize.define('associations', {
  associationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  associationName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  associationAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contactPersonName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contactPersonEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  contactPersonPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  numberOfBuses: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = association;
