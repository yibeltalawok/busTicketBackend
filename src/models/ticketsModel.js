// models/ticketModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Passenger = require('./passengerModel');
const Bus = require('./busModel');
const Route = require('./terminalModel');
const BusAssignation = require('./busAssignationModel');
const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // assignId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: BusAssignation,
  //     key: 'id',
  //   },
  // },
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uniqueNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reservationDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignationDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servicePayment:{
    type:DataTypes.STRING,
    allowNull:true
  },
  cost:{
    type:DataTypes.STRING,
    allowNull:true
  }
});

// Define associations
Ticket.belongsTo(BusAssignation, { foreignKey: 'assignId', as: 'assignedBus' });
Ticket.belongsTo(Passenger);
Ticket.belongsTo(Bus);
Ticket.belongsTo(Route);

module.exports = Ticket;
