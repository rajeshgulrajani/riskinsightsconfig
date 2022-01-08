const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//require('dotenv').config();
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Access-Control-Allow-Origin", "Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
//db.sequelize.sync({ force: true }).then(() => {
  db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to funds application." });
});
require("./app/routes/config.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(process.env)
  console.log(`Server is running on port ${PORT}.`);
});