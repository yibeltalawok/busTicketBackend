const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const Ticket = require('../models/ticketsModel');
const Bus = require('../models/busModel');
const assignedBus = require('../models/busAssignationModel');
const Route = require('../models/terminalModel');
const Passenger = require('../models/passengerModel');
// Create a new ticket order
const createTicketOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { seatNumber,fullName,phoneNumber, reservationDate, PassengerId, BusId, RouteId } = req.body;
    // Check if the bus exists
    const bus = await Bus.findByPk(BusId);
    const capacity=bus.capacity;
    if (seatNumber>capacity) {
      return res.status(404).json({ error: 'Bus  has no Such seat number ' });
    }
    if (!seatNumber || isNaN(seatNumber) || seatNumber < 1 || seatNumber > capacity) {
      return res.status(404).json({ error: 'Invalid seat number. Please provide a seat number between 1 and .' +capacity });
  }
    if (!bus) {
      return res.status(404).json({ error: 'Bus not found' });
    }
    // Check if the selected seat is available
    if (!(await isSeatAvailable(bus, seatNumber))) {
      return res.status(400).json({ error: 'Seat already booked' });
    }

    // Record the ticket order
    const ticket = await Ticket.create({
      seatNumber,
      reservationDate,
      fullName,
      phoneNumber,
      PassengerId,
      BusId,
      RouteId,
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket order:', error);
    res.status(500).json({ error: error });
  }
};

// Get all ticket orders
const getAllTicketOrders = async (req, res) => {
  try {
    const ticketOrders = await Ticket.findAll({
      include: [
        { model: Passenger },
        { model: Bus },
        { model: Route }
      ]
    });
    res.status(200).json(ticketOrders);
  } catch (error) {
    console.error('Error fetching ticket orders:', error);
    res.status(500).json({ error: error.message });
  }
};



// Get ticket order by ID
const getTicketOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const ticketOrder = await Ticket.findByPk(id,
      {
        include: [
          { model: Passenger },
          { model: Bus },
          { model: Route }
        ]});
    if (!ticketOrder) {
      return res.status(404).json({ error: 'Ticket order not found' });
    }
    res.status(200).json(ticketOrder);
  } catch (error) {
    console.error('Error fetching ticket order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update ticket order by ID
const updateTicketOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatNumber,fullName,phoneNumber, reservationDate, PassengerId, BusId, RouteId } = req.body;

    // Check if the ticket order exists
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket order not found' });
    }

    // Update the ticket order
    await ticket.update({
      seatNumber,
      reservationDate,
      phoneNumber,
      fullName,
      PassengerId,
      BusId,
      RouteId,
    });

    res.status(200).json({ message: 'Ticket order updated successfully' });
  } catch (error) {
    console.error('Error updating ticket order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete ticket order by ID
const deleteTicketOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket order not found' });
    }
    await ticket.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting ticket order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get ticket orders for each bus
const getTicketOrdersByBus = async (req, res) => {
     try {
       const { BusId } = req.params;
       const assignedBuses = await assignedBus.findAll({ where: { BusId: BusId}});
       console.log("transport===",assignedBuses[0]?.dataValues?.date)
      const ticketOrders = await Ticket.findAll({
        where: { BusId:BusId,reservationDate:assignedBuses[0]?.dataValues?.date },
          include: [
            { model: Passenger },
            { model: Bus },
            { model: Route }
          ]
       });
       res.status(200).json(ticketOrders);
     } catch (error) {
       console.error('Error fetching ticket orders for bus:', error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };
// Get ticket orders for each route
const getTicketOrdersByRoute = async (req, res) => {
  try {
    const { RouteId } = req.params;
    const ticketOrders = await Ticket.findAll({
      where: { RouteId:RouteId },
      include: [
        { model: Passenger },
        { model: Bus },
        { model: Route }
      ]

   });
    res.status(200).json(ticketOrders);
  } catch (error) {
    console.error('Error fetching ticket orders for route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get ticket orders for each date
const getTicketOrdersByDate = async (req, res) => {
     try {
       const { date } = req.params;
       const ticketOrders = await Ticket.findAll({
        where: { reservationDate:date },
        include: [
          { model: Passenger },
          { model: Bus },
          { model: Route }
        ]
       });
       res.status(200).json(ticketOrders);
     } catch (error) {
       console.error('Error fetching ticket orders for date:', error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };

   // Get ticket orders for each passenger
   const getTicketOrdersByPassenger = async (req, res) => {
     try {
       const { passengerId } = req.params;
       const ticketOrders = await Ticket.findAll({
        where: { PassengerId:passengerId },
        include: [
          { model: Passenger },
          { model: Bus },
          { model: Route }
        ]
       });
       res.status(200).json(ticketOrders);
     } catch (error) {
       console.error('Error fetching ticket orders for passenger:', error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
   };
   const isSeatAvailable = async (bus, seatNumber) => {
    try {
      // Check if there's any existing ticket for the provided bus and seatNumber
      const existingTicket = await Ticket.findOne({
        where: {
          BusId: bus.id,
          seatNumber: seatNumber
        }
      });
      // If no ticket found, seat is available
      return !existingTicket;
    } catch (error) {
      console.error('Error checking seat availability:', error);
      throw new Error('Internal Server Error');
    }
  };

  const checkSeatReservation = async (req, res) => {
    try {
      const { seatNumber, reservationDate, BusId } = req.body;

      // Find if there's any existing ticket for the provided seatNumber, reservationDate, and BusId
      const existingTicket = await Ticket.find({
        where: {
          BusId: BusId,
          seatNumber: seatNumber,
          reservationDate:reservationDate
        }
      });

      if (existingTicket) {
        return res.status(200).json({ message: 'Seat is already reserved for the provided date' });
      } else {
        return res.status(404).json({ message: 'Seat is available for the provided date' });
      }
    } catch (error) {
      console.error('Error checking seat reservation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
// Get free seat numbers for each bus
const getFreeSeatNumbersByBus = async (req, res) => {
  try {
    // Fetch all buses
    const assignedBuses = await assignedBus.findAll();
    const freeSeatNumbersByBus = [];
    // const date = new Date();
    // const dateString = date.toISOString().split('T')[0];
    for (const assignedBus of assignedBuses) {
      const assignedDate = assignedBus.date;
      // const assignedDateString=assignedDate.toISOString().split('T')[0];
      const bus = await Bus.findByPk(assignedBus.busId);
      if (bus) {
        // Fetch booked seat numbers for this bus
        const bookedTickets = await Ticket.findAll({
          where: { BusId: bus.id ,
                   reservationDate:assignedDate
                  },
         attributes: ['seatNumber'],
          raw: true,
        });
        // Extract booked seat numbers
        const bookedSeatNumbers = bookedTickets.map(ticket => ticket.seatNumber);
        // Generate free seat numbers
        const freeSeatNumbers = [];
        for (let i = 1; i <= bus.capacity; i++) {
          if (!bookedSeatNumbers.includes(String(i))) {
            freeSeatNumbers.push(i);
          }
        }
        // Push the result for this bus including bus information
        freeSeatNumbersByBus.push({
          busId: bus.id,
          busDetails: bus,
          freeSeatNumbers
        });
      }
    }
    res.status(200).json(freeSeatNumbersByBus);
  } catch (error) {
    console.error('Error fetching free seat numbers by bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
   module.exports = {
     createTicketOrder,
     getAllTicketOrders,
     getTicketOrderById,
     updateTicketOrderById,
     deleteTicketOrderById,
     getTicketOrdersByBus,
     getTicketOrdersByRoute,
     getTicketOrdersByDate,
     getTicketOrdersByPassenger,
     checkSeatReservation,
     getFreeSeatNumbersByBus
   };
