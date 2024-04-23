const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Association = require('./assocationModel'); // Corrected the spelling of the model name
const BusOwner = sequelize.define('BusOwner', {
  busOwnerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First name is required.',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Last name is required.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^\+?[0-9]+$/,
        msg: 'Phone number must be numeric.',
      },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Address is required.',
      },
    },
  },
});

// Assuming you have another model named 'Association' to associate with BusOwner
// Replace 'association' with the correct association name or model
BusOwner.belongsTo(Association, { foreignKey: 'associationId' });

module.exports = BusOwner;
