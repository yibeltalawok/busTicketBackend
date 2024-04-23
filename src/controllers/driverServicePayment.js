const DriverServicePayment = require('../models/driverServicePaymentModel');
const Station = require('../models/stationModel');
const Association = require('../models/assocationModel');

// Create a new driver service payment
exports.createDriverServicePayment = async (req, res) => {
  try {
    const { amount, paymentDate, paymentReason, stationId, associationId } = req.body;

    const newPayment = await DriverServicePayment.create({
      amount,
      paymentDate,
      paymentReason,
      stationId,
      associationId
    });

    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error creating driver service payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all driver service payments with associated station and association
exports.getAllDriverServicePayments = async (req, res) => {
  try {
    const payments = await DriverServicePayment.findAll({
      include: [
        { model: Station },
        { model: Association }
      ]
    });
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching driver service payments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get driver service payment by ID with associated station and association
exports.getDriverServicePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await DriverServicePayment.findByPk(id, {
      include: [
        { model: Station },
        { model: Association }
      ]
    });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching driver service payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update driver service payment by ID
exports.updateDriverServicePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentDate, paymentReason, stationId, associationId } = req.body;

    const payment = await DriverServicePayment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await payment.update({
      amount,
      paymentDate,
      paymentReason,
      stationId,
      associationId
    });

    res.status(200).json({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error('Error updating driver service payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete driver service payment by ID
exports.deleteDriverServicePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await DriverServicePayment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await payment.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting driver service payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
