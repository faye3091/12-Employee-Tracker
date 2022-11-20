//Dependencies
const mysql = require("mysql2");

require("dotenv").config();

//Connection to server
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  //password is hidden in github
  password: "V-elson0425",
  //password: process.env.MYSQL_PASSWORD,
  database: "employees",
});

//Export
module.exports = connection;
