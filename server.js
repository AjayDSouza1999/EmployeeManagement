var express = require("express");
var server = express();
//var routes = require("./routes/routes");
var mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("DB Connectedddd!!!!!!!!!!!");
});

mongoose.connection.on("error", function (error) {
  console.log("DB Connection Error:", error);
});

server.use(cors());
server.use(express.json());
//server.use(routes);

server.listen(8000, function (error) {
  if (error) {
    console.log("errorr");
  } else {
    console.log("startedddddd");
  }
});