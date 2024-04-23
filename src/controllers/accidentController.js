const Accident = require('../models/accidentModel');
const Bus=require('../models/busModel');
const Driver=require('../models/driverModel');
exports.createAccident = async (req, res, next) => {
     try {
       const { busId, driverId, description, place, type, accidentDate } = req.body;
       const newAccident = await Accident.create({
         busId,
         driverId,
         description,
         place,
         type,
         accidentDate,
       });
       res.status(201).json(newAccident);
     } catch (error) {
       console.error('Error creating Accident:', error);
       next(error);
     }
   };

   exports.getAllAccidents = async (req, res, next) => {
     try {
       const accidents = await Accident.findAll({
        include: [

          { model: Bus },
          { model: Driver}
        ]
      });
       res.json(accidents);
     } catch (error) {
       next(error);
     }
   };


   exports.getAccidentById = async (req, res, next) => {
     const { id } = req.params;
     try {
       const accident = await Accident.findByPk(id, {
         include: [
          { model: Bus},
           { model: Driver },
         ],
       });

       if (!accident) {
         res.status(404).json({ error: 'Accident not found.' });
       } else {
         res.json(accident);
       }
     } catch (error) {
       next(error);
     }
   };

   exports.updateAccident = async (req, res, next) => {
     try {
       const { id } = req.params;
       const { busId, driverId, description, place, type, accidentDate } = req.body;

       const existingAccident = await Accident.findByPk(id);

       if (!existingAccident) {
         res.status(404).json({ error: 'Accident not found.' });
         return;
       }

       const updatedAccident = await existingAccident.update({
         busId,
         driverId,
         description,
         place,
         type,
         accidentDate,
       });

       res.json(updatedAccident);
     } catch (error) {
       next(error);
     }
   };

   exports.deleteAccident = async (req, res, next) => {
     try {
       const { id } = req.params;
       const existingAccident = await Accident.findByPk(id);

       if (!existingAccident) {
         res.status(404).json({ error: 'Accident not found.' });
         return;
       }

       await existingAccident.destroy();

       res.json({ message: 'Accident deleted successfully.' });
     } catch (error) {
       next(error);
     }
   };
