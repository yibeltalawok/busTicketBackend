// controllers/busRoutingController.js
const Tariff = require('../models/tariffModel');
const Route = require('../models/terminalModel');

exports.createTariffScale = async (req, res, next) => {
  try {
  const {terminalId,type,value1,value2,value3 } = req.body;
    // Validate if source and destination stations exist
    if (!terminalId) {
      res.status(400).json({ error: 'Terminal  not found.' });
      return;
    }

    const newTarriffScale = await Tariff.create({
      terminalId,
       type,
       value1,
       value2,
       value3
    });

    res.status(201).json(newTarriffScale);
  } catch (error) {
    next(error);
  }
};


exports.getAllTarrifScale = async (req, res, next) => {
     try {
       const tarriffScale = await Tariff.findAll({
        include: [
          { model: Route, as: 'terminal', required: true }        ],
       });

       res.json(tarriffScale);
     } catch (error) {
       next(error);
     }
   };   
 exports.getTariffById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const busRouting = await Tariff.findByPk(id, {
        include: [
          { model: Route, as: 'terminal', required: true }        ],
       });


      if (!busRouting) {
        res.status(404).json({ error: 'Route not found try again.' });
      } else {
        res.json(busRouting);
      }
    } catch (error) {
      next(error);
    }
  };

exports.updateTariffScale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {terminalId,type,value1,value2,value3 } = req.body;
    const existingTariffScale = await Tariff.findByPk(id);

    if (!existingTariffScale) {
      res.status(404).json({ error: 'Tariff routing not found.' });
      return;
    }
    // Validate if source and destination stations exist

    if (!terminalId) {
      res.status(400).json({ error: 'Source or destination station not found.' });
      return;
    }
    const updatedTariff = await existingTariffScale.update({
      terminalId,
      type,
      value1,
      value2,
      value3
    });
    res.json(updatedTariff);
  } catch (error) {
    next(error);
  }
};
