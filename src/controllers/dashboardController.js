// dashboardController.js
const Accident = require('../models/accidentModel');
const Association = require('../models/assocationModel');
const Attendance = require('../models/attendanceModel');
const BusAssignation = require('../models/busAssignationModel');
const Bus = require('../models/busModel');
const BusOwner = require('../models/busOwnerModel');
const BusRouting = require('../models/terminalModel');
const Communication = require('../models/communicationModel');
const Driver = require('../models/driverModel');
const EmergencyContact = require('../models/emergencyModel');
const User = require('../models/usersModel');
const Feedback = require('../models/feedbackModel');
const LostAndFoundMaterial = require('../models/lostModel');
const Maintenance = require('../models/maintainanceModel');
const Passenger = require('../models/passengerModel');
const Punishment = require('../models/punishmentModel');
const ServicePayment = require('../models/servicePaymentModel');
const Station = require('../models/stationModel');
const Route = require('../models/terminalModel');
const Ticket = require('../models/ticketsModel');


exports.getDashboardStats = async (req, res, next) => {
  try {
    const stats = {
      accidents: await Accident.count(),
      associations: await Association.count(),
      attendances: await Attendance.count(),
      busAssignations: await BusAssignation.count(),
      buses: await Bus.count(),
      busOwners: await BusOwner.count(),
      busRoutings: await BusRouting.count(),
      communications: await Communication.count(),
      drivers: await Driver.count(),
      emergencyContacts: await EmergencyContact.count(),
      employees: await User.count(),
      feedbacks: await Feedback.count(),
      lostAndFoundMaterials: await LostAndFoundMaterial.count(),
      maintenances: await Maintenance.count(),
      passengers: await Passenger.count(),
      punishments: await Punishment.count(),
      servicePayments: await ServicePayment.count(),
      stations: await Station.count(),
      terminals: await Route.count(),
      tickets: await Ticket.count(),
      users: await User.count(),
      // Add counts for other models here
    };

    res.json(stats);
  } catch (error) {
    next(error);
  }
};
