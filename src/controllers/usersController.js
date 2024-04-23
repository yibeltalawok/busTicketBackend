// controllers/employeeController.js
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
// CRUD operations

// Create User
exports.createEmployee = async (req, res, next) => {
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating User:', error.message);
    next(error);
  }
};

// Get all Employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await User.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Error getting Employees:', error.message);
    next(error);
  }
};

// Get User by ID
exports.getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await User.findByPk(id);
    if (!employee) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.json(employee);
    }
  } catch (error) {
    console.error('Error getting User by ID:', error.message);
    next(error);
  }
};

// Update User by ID
exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedEmployee] = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.json(updatedEmployee[0]);
    }
  } catch (error) {
    console.error('Error updating User:', error.message);
    next(error);
  }
};

// Delete User by ID
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRowsCount = await User.destroy({
      where: { id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.json({ message: 'User deleted successfully.' });
    }
  } catch (error) {
    console.error('Error deleting User:', error.message);
    next(error);
  }
};
