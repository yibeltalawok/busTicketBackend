// controllers/userLocationController.js
const UserLocation = require('../models/locationModel');

// Create a new user location
exports.createUserLocation = async (req, res) => {
    try {
        const { latitude, longitude, phone } = req.body;
        const userLocation = await UserLocation.create({ latitude, longitude, phone });
        res.status(201).json({
            status: 'success',
            data: userLocation
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all user locations
exports.getAllUserLocations = async (req, res) => {
    try {
        const userLocations = await UserLocation.findAll();
        res.status(200).json({
            status: 'success',
            data: userLocations
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Get a single user location by ID
exports.getUserLocationByPhone = async (req, res) => {
     try {
         const userLocation = await UserLocation.findOne({ where: { phone: req.params.phone } });
         if (!userLocation) {
             return res.status(404).json({
                 status: 'fail',
                 message: 'User location not found for the provided phone number'
             });
         }
         // Extract latitude and longitude
         const { latitude, longitude } = userLocation;

         res.status(200).json({
             status: 'success',
             data: {
                 latitude,
                 longitude
             }
         });
     } catch (err) {
         res.status(500).json({
             status: 'error',
             message: err.message
         });
     }
 };

// Update a user location
exports.updateUserLocation = async (req, res) => {
    try {
        const { latitude, longitude, phone } = req.body;
        const userLocation = await UserLocation.findByPk(req.params.id);
        if (!userLocation) {
            return res.status(404).json({
                status: 'fail',
                message: 'User location not found'
            });
        }
        await userLocation.update({ latitude, longitude, phone });
        res.status(200).json({
            status: 'success',
            message: 'User location updated successfully',
            data: userLocation
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a user location
exports.deleteUserLocation = async (req, res) => {
    try {
        const userLocation = await UserLocation.findByPk(req.params.id);
        if (!userLocation) {
            return res.status(404).json({
                status: 'fail',
                message: 'User location not found'
            });
        }
        await userLocation.destroy();
        res.status(204).json({
            status: 'success',
            message: 'User location deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
