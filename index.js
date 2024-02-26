require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();
app.use("/healthcheck", (req, res){
  res.status(200).send('Ok')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const dbConn = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || "",
  user: process.env.RDS_USERNAME || "",
  password: process.env.RDS_PASSWORD || "",
  database: process.env.DB_NAME || "",
  port: process.env.RDS_PORT || "",
});

dbConn.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Database was connected");
  require("./routes")({ app, dbConn });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
