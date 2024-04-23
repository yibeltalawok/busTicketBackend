const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bus = require('./busModel');

const LostAndFoundMaterial = sequelize.define('LostAndFoundMaterial', {
  materialId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  itemName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  contactPerson: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contactEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  contactPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  isClaimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define associations
LostAndFoundMaterial.belongsTo(Bus, { foreignKey: 'busId', as: 'bus' });

module.exports = LostAndFoundMaterial;
