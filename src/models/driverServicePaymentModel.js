const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./stationModel');
const Assocation= require('./assocationModel');

const DriverServicePayment = sequelize.define('DriverServicePayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentReason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
DriverServicePayment.belongsTo(Station, { foreignKey: 'stationId' });
DriverServicePayment.belongsTo(Assocation, { foreignKey: 'assocationId' });


module.exports = DriverServicePayment;
