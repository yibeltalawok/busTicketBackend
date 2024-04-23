// models/ticketModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Passenger = require('./passengerModel');
const Bus = require('./busModel');
const Route = require('./terminalModel');
const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define associations
Ticket.belongsTo(Passenger);
Ticket.belongsTo(Bus);
Ticket.belongsTo(Route);
module.exports = Ticket;
