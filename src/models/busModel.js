const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const BusOwner = require('./busOwnerModel');
const Association = require('./assocationModel');
const Driver = require('./driverModel'); // Import the Driver model

const Bus = sequelize.define('Bus', {
  licensePlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  talga: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sideNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  insurance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Add driverId field
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow null if a bus does not have a driver
    references: {
      model: Driver,
      key: 'id'
    }
  }
});

// Define associations
Bus.belongsTo(BusOwner, { foreignKey: 'ownerId' });
Bus.belongsTo(Association, { foreignKey: 'associationId' });
Bus.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' }); // Associate Bus with Driver

module.exports = Bus;
