// models/servicePaymentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Driver = require('./driverModel');
const Association = require('./assocationModel');
const Station = require('./stationModel');

const ServicePayment = sequelize.define('ServicePayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define associations
ServicePayment.belongsTo(Driver, { foreignKey: 'driverId' });
ServicePayment.belongsTo(Association, { foreignKey: 'associationId' });
ServicePayment.belongsTo(Station, { foreignKey: 'stationId' });
module.exports = ServicePayment;
