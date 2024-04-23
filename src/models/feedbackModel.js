// feedbackModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a separate file for database configuration

const Feedback = sequelize.define('Feedback', {
  feedbackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
module.exports = Feedback;
