const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const Ticket = require('../models/ticketsModel');
const Bus = require('../models/busModel');
const assignedBus = require('../models/busAssignationModel');
const Route = require('../models/terminalModel');
const Passenger = require('../models/passengerModel');
const { level } = require('winston');
// Create a new ticket order
const createTicketOrder = async (req, res) => {
  try {
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  // const {seatNumber,fullName,phoneNumber,gender,uniqueNumber,reservationDate,assignationDate,PassengerId,assignId,BusId,RouteId,cost,servicePayment} = req.body;
  //   // Check if the bus exists
  //   const bus = await Bus.findByPk(BusId);
  //   const capacity=bus.capacity;
  //   if (seatNumber>capacity) {
  //     return res.status(404).json({ error: 'Bus  has no Such seat number ' });
  //   }
  //   if (!seatNumber || isNaN(seatNumber) || seatNumber < 1 || seatNumber > capacity) {
  //     return res.status(404).json({ error: 'Invalid seat number. Please provide a seat number between 1 and .' +capacity });
  // }
  //   if (!bus) {
  //     return res.status(404).json({ error: 'Bus not found' });
  //   }
  //   // Check if the selected seat is available
  //   if (!(await isSeatAvailable(bus, seatNumber))) {
  //     return res.status(400).json({ error: 'Seat already booked' });
  //   }
  //        // Check if the bus exists 
          const seatNumber  =req.body[0].seatNumber;
          const assignId  =req.body[0].assignId
          const existingTicket = await Ticket.findOne({ where: { seatNumber,assignId } });
          if (existingTicket) {
            return res.status(400).json({ error: 'Ticket is already exist' });
           }
  // Record the ticket order
    // let data =[]
    // for(let i=0;i<req.body.length;i++){
    //   data.push({seatNumber:req.body[i].seatNumber,reservationDate:req.body[i].reservationDate,assignationDate:req.body[i].assignationDate
    //     ,fullName:req.body[i].fullName,gender:req.body[i].gender,uniqueNumber:req.body[i].uniqueNumber,phoneNumber:req.body[i].phoneNumber,
    //     PassengerId:req.body[i].PassengerId,BusId:req.body[i].BusId,RouteId:req.body[i].RouteId,servicePayment:req.body[i].servicePayment,cost:req.body[i].cost})}
    // const ticket = await Ticket.bulkCreate(data);
    const ticket = await Ticket.create({...req.body[0]});
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
    const ticketOrder = await Ticket.findByPk(id,
      {
        include: [
          { model: Passenger},
          { model: Bus},
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
const { seatNumber,fullName,phoneNumber,gender,uniqueNumber, reservationDate,assignationDate,PassengerId, BusId, RouteId,cost,servicePayment } = req.body;
    // Check if the ticket order exists
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket order not found' });
    }
    // Update the ticket order
    await ticket.update({
      seatNumber,
      reservationDate,
      assignationDate,
      phoneNumber,
      uniqueNumber,
      fullName,
      gender,
     PassengerId,
      BusId,
      RouteId,
      cost,
      servicePayment
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
// Get ticket orders generall report
const getTicketOrdersReport = async (req, res) => {
  try {
   const {reservationDate}  = req.query;
   if (reservationDate=="null-null-null") {
    return res.status(404).json({ error: 'reservationDate not found' });
  }
   const ticketOrders = await Ticket.findAll({
      where: {reservationDate},
      include: [
                { model:Passenger},
                { model: Bus },
                { model: Route }
               ]});
   let seatNumber=0
   let ticket=0
   let freeSeat=0
   let female=0
   let male=0
   let cost=0
   let servicePayment=0
   let totalServicePayment=0
   let totalCost=0
   let totalPayment=0
   let ticketReport=[]
   let busData=[]
   let generallCost=0
   let generallServicePayment=0
   let countBus=0
   let countRoute=0
   let countMale=0
   let countFemale=0
   let totalPassenger=0
   for(let i=0;i<ticketOrders?.length;i++){
      totalPassenger=ticketOrders?.length
      generallCost+=parseFloat(ticketOrders[i]?.Route?.cost)
      generallServicePayment+=parseFloat(ticketOrders[i]?.Route?.servicePayment)
      if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga)
        countBus++
      if(ticketOrders[i]?.Route?.destinationStationId!=ticketOrders[i+1]?.Route?.destinationStationId)
        countRoute++
      if(ticketOrders[i]?.gender=="male")
        countMale++
      if(ticketOrders[i]?.gender=='female')
        countFemale++
      if(ticketOrders[i]?.busId==ticketOrders[i+1]?.busId){
        if(ticketOrders[i]?.gender=="male")
          male++
        if(ticketOrders[i]?.gender=='female')
          female++
      }
    ticket=male+female
    freeSeat=ticketOrders[i]?.Bus.capacity-ticket
    totalCost=ticketOrders[i]?.Route?.cost*ticket
    totalServicePayment=ticketOrders[i]?.Route?.servicePayment*ticket
    totalPayment=totalCost+totalServicePayment
    
  if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga){
    busData.push({sideNo:ticketOrders[i]?.Bus?.sideNo,busTalga:ticketOrders[i]?.Bus?.talga,freeSeat:freeSeat,male:male,
    female:female,cost:ticketOrders[i]?.Route?.cost,totalCost:totalCost,servicePayment:ticketOrders[i]?.Route?.servicePayment,
    totalServicePayment:totalServicePayment,totalPayment:totalPayment,ticket:ticket,busId:ticketOrders[i]?.Bus?.id,
    seatNumber:ticketOrders[i]?.Bus?.capacity,route:ticketOrders[i]?.Route?.destinationStationId,
    })
  male=0
  female=0
  }
        // ticket=countMale+countFemale
        // totalCost=cost*ticket
        // totalServicePayment=servicePayment*ticket
        // totalPayment=totalCost+totalServicePayment
      }
       ticketReport.push({data:busData,countBus:countBus,countRoute:countRoute,countMale:countMale,countFemale:countFemale,totalPassenger:totalPassenger,generallCost:generallCost,generallServicePayment:generallServicePayment})
      //  ,ticket:ticket,freeSeat:freeSeat,totalServicePayment:totalServicePayment,
      //  totalCost:totalCost,totalPayment:totalPayment,generallCost:generallCost,generallServicePayment:generallServicePayment,
      //  countMale:countMale,countFemale:countFemale})
       res.status(200).json(ticketReport);
  } catch (error) {
    console.error('Error fetching ticket orders for bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get ticket orders for each bus
const getTicketOrdersByBus = async (req, res) => {
     try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {BusId,reservationDate}  = req.query;
      if (!BusId || !reservationDate) {
        return res.status(400).json({ error: 'BusId and reservation date are required parameters' });
      }
      //  const assignedBuses = await assignedBus.findAll({ where: { BusId: BusId}});
        const ticketOrders = await Ticket.findAll({
          where: { BusId,reservationDate },
          include: [
           { model: Passenger },
            { model: Bus },
            { model: Route }
          ]
        });
        let countBus=0
        let countRoute=0
        let countMale=0
        let countFemale=0
        let totalCost=0
        let totalServicePayment=0
        let totalPayment=0 
        for(let i=0;i<ticketOrders?.length;i++){
          totalCost+=parseFloat(ticketOrders[i]?.Route?.cost)
          totalServicePayment+=parseFloat(ticketOrders[i]?.Route?.servicePayment)
          if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga)
            countBus++
          if(ticketOrders[i]?.Route?.destinationStationId!=ticketOrders[i+1]?.Route?.destinationStationId)
            countRoute++
          if(ticketOrders[i]?.gender=='male')
            countMale++
          if(ticketOrders[i]?.gender=='female')
            countFemale++
          }       
          totalPayment=parseFloat(totalCost)+parseFloat(totalServicePayment)
          ticketOrders.push({totalbus:countBus,totalRoute:countRoute,male:countMale,
          female:countFemale,totalPayment:totalPayment,totalCost:totalCost,totalServicePayment:totalServicePayment})   
              res.status(200).json(ticketOrders);
     } catch (error) {
       console.error('Error fetching ticket orders for bus:', error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
};
   const getTicketOrdersByBusLevel = async (req, res) => {
    try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     const {level,reservationDate}  = req.query;
     if (!level || !reservationDate) {
       return res.status(400).json({ error: 'Level and reservation date are required parameters' });
     }
     //  const assignedBuses = await assignedBus.findAll({ where: { BusId: BusId}});
       const ticketOrder = await Ticket.findAll({
         where: {reservationDate },
         include: [
         { model: Passenger },
           { model: Bus },
           { model: Route }
         ]
       });
       let countBus=0
       let countRoute=0
       let countMale=0
       let countFemale=0
       let ticketOrders=[]
       let totalCost=0
       let totalServicePayment=0
       let totalPayment=0
       for(let i=0;i<ticketOrder?.length;i++){
         if(ticketOrder[i]?.Bus?.level==level)
           ticketOrders.push(ticketOrder[i])
           }
       for(let i=0;i<ticketOrders?.length;i++){
         totalCost+=parseFloat(ticketOrders[i]?.Route?.cost)
         totalServicePayment+=parseFloat(ticketOrders[i]?.Route?.servicePayment)
           if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga)
             countBus++
           if(ticketOrders[i]?.Route?.destinationStationId!=ticketOrder[i+1]?.Route?.destinationStationId)
             countRoute++
           if(ticketOrders[i]?.gender=='male')
             countMale++
           if(ticketOrders[i]?.gender=='female')
             countFemale++
           }
           totalPayment=parseFloat(totalCost)+parseFloat(totalServicePayment)
           ticketOrders.push({totalbus:countBus,totalRoute:countRoute,male:countMale,
           female:countFemale,totalPayment:totalPayment,totalCost:totalCost,totalServicePayment:totalServicePayment})
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
    const {reservationDate}  = req.query;
    const ticketOrders = await Ticket.findAll({
      where: {RouteId,reservationDate},
      include: [
        { model: Passenger },
        { model: Bus },
        { model: Route }
      ]
   });
   let countBus=0
   let countRoute=0
   let countMale=0
   let countFemale=0
   let totalCost=0
   let totalServicePayment=0
   let totalPayment=0
   for(let i=0;i<ticketOrders?.length;i++){
    totalCost+=parseFloat(ticketOrders[i]?.Route?.cost)
    totalServicePayment+=parseFloat(ticketOrders[i]?.Route?.servicePayment)
     if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga)
       countBus++
     if(ticketOrders[i]?.Route?.destinationStationId!=ticketOrders[i+1]?.Route?.destinationStationId)
       countRoute++
     if(ticketOrders[i]?.Passenger?.gender=='male')
       countMale++
     if(ticketOrders[i]?.Passenger?.gender=='female')
       countFemale++
     }
     totalPayment=parseFloat(totalCost)+parseFloat(totalServicePayment)
     ticketOrders.push({totalbus:countBus,totalRoute:countRoute,male:countMale,
     female:countFemale,totalPayment:totalPayment,totalCost:totalCost,totalServicePayment:totalServicePayment})   
      res.status(200).json(ticketOrders);
  } catch (error) {
    console.error('Error fetching ticket orders for route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get ticket orders for each date
const getTicketOrdersByDate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {reservationDate}  = req.query;
    if (!reservationDate) {
      return res.status(400).json({ error: 'reservationDate are required parameters' });
    }
    //  const assignedBuses = await assignedBus.findAll({ where: { BusId: BusId}});
      const ticketOrders = await Ticket.findAll({
        where: {reservationDate:reservationDate },
        include: [
          { model: Passenger },
          { model: Bus },
          { model: Route }
        ]
      });
      let countBus=0
      let countRoute=0
      let countMale=0
      let countFemale=0
      let totalCost=0
      let totalServicePayment=0
      let totalPayment=0
      for(let i=0;i<ticketOrders?.length;i++){
        totalCost+=parseFloat(ticketOrders[i]?.Route?.cost)
        totalServicePayment+=parseFloat(ticketOrders[i]?.Route?.servicePayment)
        if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga)
          countBus++
        if(ticketOrders[i]?.Route?.destinationStationId!=ticketOrders[i+1]?.Route?.destinationStationId)
          countRoute++
        if(ticketOrders[i]?.gender=='male')
          countMale++
        if(ticketOrders[i]?.gender=='female')
          countFemale++
        }
        totalPayment=parseFloat(totalCost)+parseFloat(totalServicePayment)
        ticketOrders.push({totalbus:countBus,totalRoute:countRoute,male:countMale,
        female:countFemale,totalPayment:totalPayment,totalCost:totalCost,totalServicePayment:totalServicePayment})
        res.status(200).json(ticketOrders);
      } catch (error) {
       console.error('Error fetching ticket orders by date:', error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
   };
   // Get ticket orders for each date
const getTicketOrdersAnalysis = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {reservationDate}  = req.query;
    if (!reservationDate) {
      return res.status(400).json({ error: 'reservationDate are required parameters' });
    }
    //  const assignedBuses = await assignedBus.findAll({ where: { BusId: BusId}});
      const ticketOrders = await Ticket.findAll({
        where: {reservationDate:reservationDate },
        include: [
          { model: Passenger },
          { model: Bus },
          { model: Route }
        ]
      });
      let countBus=0
      let countRoute=0
      let countMale=0
      let totalCost=0
      let countFemale=0
      let totalServicePayment=0
      let totalPayment=0
      for(let i=0;i<ticketOrders?.length;i++){
        totalCost+=parseFloat(ticketOrders[i]?.Route?.cost)
        totalServicePayment+=parseFloat(ticketOrders[i]?.Route?.servicePayment)
        if(ticketOrders[i]?.Bus?.talga!=ticketOrders[i+1]?.Bus?.talga)
          countBus++
        if(ticketOrders[i]?.Route?.destinationStationId!=ticketOrders[i+1]?.Route?.destinationStationId)
          countRoute++
        if(ticketOrders[i]?.gender=='male')
          countMale++
        if(ticketOrders[i]?.gender=='female')
          countFemale++
        }
        totalPayment=parseFloat(totalCost)+parseFloat(totalServicePayment)
        ticketOrders.push({totalbus:countBus,totalRoute:countRoute,male:countMale,
        female:countFemale,totalPayment:totalPayment,totalCost:totalCost,totalServicePayment:totalServicePayment})    
          res.status(200).json(ticketOrders);
      }catch (error) {
      console.error('Error fetching ticket orders by date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
       }};
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {BusId,assignationDate}  = req.query;
      if (!BusId || !assignationDate) {
        return res.status(400).json({ error: 'BusId and assignationDate are required parameters' });
      }
    // const assignedBuses = await assignedBus.findAll();
    const freeSeatNumbersByBus = [];
    // // const date = new Date();
    // // const dateString = date.toISOString().split('T')[0];
    // for (const assignedBus of assignedBuses) {
    //   const assignedDate = assignedBus.date;
      // const assignedDateString=assignedDate.toISOString().split('T')[0];
      const bus = await Bus.findByPk(BusId);
      // if (bus) {
        // Fetch booked seat numbers for this bus
        const bookedTickets = await Ticket.findAll({
          where: { BusId,
            assignationDate
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
     // }
   // }
    res.status(200).json(freeSeatNumbersByBus);
  } catch (error) {
    console.error('Error fetching free seat numbers by bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Get reserved seat numbers for each bus
const getReservedSeatNumbersByBus = async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {BusId,assignationDate}  = req.query;
      if (!BusId || !assignationDate) {
        return res.status(400).json({ error: 'BusId and assignationDate are required parameters' });
      }
    const reservedSeatNumbersByBus = [];

      const bus = await Bus.findByPk(BusId);
      // if (bus) {
        // Fetch booked seat numbers for this bus
        const bookedTickets = await Ticket.findAll({
          where: { BusId,
            assignationDate
                  },
         attributes: ['seatNumber'],
          raw: true,
        });
        // Extract booked seat numbers
        const reservedSeatNumbers = bookedTickets.map(ticket => ticket.seatNumber); 
        // Push the result for this bus including bus information
        reservedSeatNumbersByBus.push({
          busId: bus.id,
          busDetails: bus,
          reservedSeatNumbers
        });
     // }
   // }
    res.status(200).json(reservedSeatNumbersByBus);
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
     getReservedSeatNumbersByBus,
     getFreeSeatNumbersByBus,
     getTicketOrdersAnalysis,
     getTicketOrdersByBusLevel,
     getTicketOrdersReport
   };
