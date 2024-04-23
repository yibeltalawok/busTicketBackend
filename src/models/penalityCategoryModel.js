const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PenaltyCategory = sequelize.define('PenaltyCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penaltyAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = PenaltyCategory;
