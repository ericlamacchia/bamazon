var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",

  
  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "A13bbcda!",
  database: "bamazon_DB"
});
// Creat the connection with the server

connection.connect(function(err) {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
  });
  
  function start() {
    inquirer
     .prompt({
       name: "welcome",
       type: "list",
       message: "Welcome to bamazon, would you like to search items",
       choices: ["View Items", "Buy Items", "EXIT"]
     })
     .then(function(answer) {
       // Based on the andswer either call the bid or post the functions
       if (answer.postOrBid === "View Items") {
         viewItems();
       }
       else if(answer.postOrBid === "Buy Items") {
         buyItems();
       } else{
         connection.end();
       }
     });
  }
  