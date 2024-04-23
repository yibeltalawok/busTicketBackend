// controllers/servicePaymentController.js
const ServicePayment = require('../models/servicePaymentModel');
const Driver =require('../models/driverModel');
const Association=require('../models/assocationModel');
const Station=require('../models/stationModel');

exports.getAllServicePayments = async (req, res, next) => {
     try {
       const servicePayments = await ServicePayment.findAll({
         include: [
           { model: Driver },
           { model: Association },
           { model: Station }
         ]
       });
       res.json(servicePayments);
     } catch (error) {
       next(error);
     }
   };


exports.getServicePaymentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const servicePayment = await ServicePayment.findByPk(id,{
     include: [
       { model: Driver },
       { model: Association },
       { model: Station }
     ]
   });
    if (!servicePayment) {
      res.status(404).json({ error: 'Service Payment not found.' });
    } else {
      res.json(servicePayment);
    }
  } catch (error) {
    next(error);
  }
};

exports.createServicePayment = async (req, res, next) => {
  const { amount, paymentDate, driverId, associationId, stationId } = req.body;
  try {
    const newServicePayment = await ServicePayment.create({ amount, paymentDate, driverId, associationId, stationId });
    res.status(201).json(newServicePayment);
  } catch (error) {
    next(error);
  }
};

exports.updateServicePayment = async (req, res, next) => {
  const { id } = req.params;
  const { amount, paymentDate, driverId, associationId, stationId } = req.body;
  try {
    const servicePayment = await ServicePayment.findByPk(id);
    if (!servicePayment) {
      res.status(404).json({ error: 'Service Payment not found.' });
    } else {
      await servicePayment.update({ amount, paymentDate, driverId, associationId, stationId });
      res.json(servicePayment);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteServicePayment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const servicePayment = await ServicePayment.findByPk(id);
    if (!servicePayment) {
      res.status(404).json({ error: 'Service Payment not found.' });
    } else {
      await servicePayment.destroy();
      res.status(204).json({ message: 'Service Payment deleted successfully.' });
    }
  } catch (error) {
    next(error);
  }
};
