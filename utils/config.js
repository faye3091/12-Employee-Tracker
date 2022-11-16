//Dependencies
const mysql = require("mysql2");

//Connection to server
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  //password is hidden in github
  password: "password",
  database: "employees",
});

//Export
module.exports = connection;
