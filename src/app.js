const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
require("dotenv").config();
const { authenticateToken } = require("./middleware/authMiddleware");
const multer = require("multer");
const helmet = require("helmet");
const cors = require("cors");
const winston = require("winston");
// Access environment variables
// const dbName = process.env.DB_NAME;
const app = express();
app.use(cors());
const PORT = process.env.PORT || 7000;
app.use(bodyParser.json());
// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

//  security features
// Define routes that don't require authentication
// const publicRoutes = ['/api/login',  '/api-docs'];
// //Middleware to exclude authentication for public routes
// app.use((req, res, next) => {
//   if (publicRoutes.includes(req.path)) {
//     return next(); // Skip authentication for public routes
//   }
//   authenticateToken(req, res, next); // Apply authentication for other routes
// });

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
    },
  })
);
// CORS middleware
app.use(cors());

// Security features middleware
app.use(helmet());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Routes import
const busRoutes = require("./routes/busRoutes");
const busOwnerRoutes = require("./routes/busOwnerRoutes");
const assocationRoutes = require("./routes/assocationRoutes");
const stationRoutes = require("./routes/stationRoute");
const maintainanceRoutes = require("./routes/maintainanceRoute");
const usersRoutes = require("./routes/userRoute");
const messageRoutes = require("./routes/communicationRoute");
const lostRoutes = require("./routes/lostRoute");
const driverRoutes = require("./routes/driveRoute");
const busTerminals = require("./routes/terminalRouting");
const Tariff = require("./routes/tariffRoute");
const busAssignation = require("./routes/busAssignationRoute");
const accidentRoutes = require("./routes/accidentRoute");
const punishmentRoutes = require("./routes/punishmentRoute");
const passengerRoutes = require("./routes/passengerRoute");
const ticketsRoutes = require("./routes/ticketRoutes");
const feedbackRoutes = require("./routes/feedbackRoute");
const emergencyRoutes = require("./routes/emergencyRoute");
const servicePaymentRoutes = require("./routes/servicePaymentRoute");
const attendanceRoutes = require("./routes/attendanceRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const authRoutes = require("./routes/loginRoute");
const booking = require("./routes/bookingRoute");
const penaltyCategoryRoutes = require("./routes/penalityCategoryRoute");
const location = require("./routes/locationRoute");
const driverBooking = require("./routes/drivierBookingRoute");
const driverServicePaymnet = require("./routes/driverServicePaymnetRoute");
const resetPassword = require("./routes/resetPasswordRouter");

// Swagger documentation import
// const swaggerDocuments = {
//   "bus-owner": require("./apidocs/busOwnerswagger.json"),
//   assocation: require("./apidocs/assocationSwagger.json"),
//   station: require("./apidocs/station.json"),
//   maintainance: require("./apidocs/maintainance.json"),
//   bus: require("./apidocs/busswagger.json"),
//   users: require("./apidocs/users.json"),
//   messages: require("./apidocs/messages.json"),
//   materials: require("./apidocs/lost.json"),
//   drivers: require("./apidocs/driver.json"),
//   terminals: require("./apidocs/terminal.json"),
//   assignation: require("./apidocs/busAssignation.json"),
//   accidents: require("./apidocs/accident.json"),
//   punshiments: require("./apidocs/punshiment.json"),
//   passengers: require("./apidocs/passanger.json"),
//   tickets: require("./apidocs/tickets.json"),
//   feedbacks: require("./apidocs/feedback.json"),
//   servicePayment: require("./apidocs/servicePayment.json"),
//   attendances: require("./apidocs/attendance.json"),
//   login: require("./apidocs/login.json"),
//   booking: require("./apidocs/booking.json"),
//   penalityCategory: require("./apidocs/penalityCategory.json"),
//   location: require("./apidocs/location.json"),
//   driverBooking: require("./apidocs/driverBooking.json"),
//   driverServicePayments: require("./apidocs/driverServicePaymnet.json"),
//   //
// };

// Route definition
app.use("/api", busRoutes);
app.use("/api", busOwnerRoutes);
app.use("/api", assocationRoutes);
app.use("/api", stationRoutes);
app.use("/api", maintainanceRoutes);
app.use("/api", usersRoutes);
app.use("/api", messageRoutes);
app.use("/api", lostRoutes);
app.use("/api", driverRoutes);
app.use("/api", busTerminals);
app.use("/api", Tariff);
app.use("/api", busAssignation);
app.use("/api", accidentRoutes);
app.use("/api", punishmentRoutes);
app.use("/api", passengerRoutes);
app.use("/api", ticketsRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", emergencyRoutes);
app.use("/api", servicePaymentRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", dashboardRoute);
app.use("/api", authRoutes);
app.use("/api", booking);
app.use("/api", penaltyCategoryRoutes);
app.use("/api", location);
app.use("/api", driverBooking);
app.use("/api", driverServicePaymnet);
app.use("/api", resetPassword);

// Swagger documentation setup
// Object.entries(swaggerDocuments).forEach(([key, value]) => {
//   app.use(
//     `/api-docs/${key}`,
//     (req, res, next) => {
//       req.swaggerDoc = value;
//       next();
//     },
//     swaggerUi.serve,
//     swaggerUi.setup()
//   );
// });

// app.get("/api-docs/:doc", (req, res) => {
//   res.send(req.swaggerDoc);
// });

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(500)
    .json({ error: `Internal Server Error : the Error is -> ${err}` });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Handle process termination gracefully
process.on("SIGINT", () => {
  console.log("Closing server...");
  // Handle closing server gracefully here (add proper shutdown logic)
  process.exit(0);
});
