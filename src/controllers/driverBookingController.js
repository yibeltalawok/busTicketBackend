const DriverBooking = require('../models/driverBookingModel');
const Station = require('../models/stationModel');
const Driver = require('../models/driverModel');

// Create a new driver booking
exports.createDriverBooking = async (req, res) => {
  try {
    const { date, time, status, stationId, driverId } = req.body;

    const newBooking = await DriverBooking.create({
      date,
      time,
      status,
      stationId,
      driverId
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating driver booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all driver bookings with associated station and driver
exports.getAllDriverBookings = async (req, res) => {
  try {
    const bookings = await DriverBooking.findAll({
      include: [
        { model: Station },
        { model: Driver }
      ]
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching driver bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get driver booking by ID with associated station and driver
exports.getDriverBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await DriverBooking.findByPk(id, {
      include: [
        { model: Station },
        { model: Driver }
      ]
    });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error fetching driver booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update driver booking by ID
exports.updateDriverBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, status, stationId, driverId } = req.body;

    const booking = await DriverBooking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.update({
      date,
      time,
      status,
      stationId,
      driverId
    });

    res.status(200).json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Error updating driver booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete driver booking by ID
exports.deleteDriverBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await DriverBooking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting driver booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
