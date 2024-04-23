// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/usersController');
const { authenticateToken } = require('../middleware/authMiddleware');
// CRUD routes

// Create User
router.post('/users', employeeController.createEmployee);

// Get all Employees
router.get('/users', employeeController.getAllEmployees);

// Get User by ID
router.get('/users/:id', employeeController.getEmployeeById);

// Update User by ID
router.put('/users/:id', employeeController.updateEmployee);

// Delete User by ID
router.delete('/users/:id', employeeController.deleteEmployee);

module.exports = router;
