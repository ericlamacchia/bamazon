//These are the npm packages that are required
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");
//This is where i set up my connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A13bbcda!",
  database: "bamazon_DB",
  port: 3306
});
// This is where the actual connection is being made
connection.connect();
//This is where I will be displaying the products that i have for sale
var display = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("-----------------------------");

    console.log("      Welcome To the Bamazon Homie!    ");

    console.log("-----------------------------");

    console.log("");

    console.log("Here is a list of our products!");

    console.log("");
    // Styling the table
    var table = new Table({
      head: ["Product Id", "Product Description", "Cost"],
      colWidths: [12, 50, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["aqua"],
        compact: true
        // 'padding-right' : 1,
      }
    });
    // This is where i need to actually push the specific data to the specific parts of the table
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].products_id, res[i].price]);
    }

    console.log(table.toString());
    console.log("");
    shopping();
  }); //End Connection to products
};
//Here is where i need to make it possible to input a products id number so that you may actually purchase it.
var shopping = function () {
  inquirer
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Please enter the Product Id of the item you wish to purchase.!"
    })
    .then(function (answer1) {
      var selection = answer1.productToBuy;
      connection.query("SELECT * FROM products WHERE Id=?", selection, function (
        err,
        res
      ) {
        // I need to make an error in case the product doesnt exist or if the item is sold out.
        if (err) throw err;
        if (res.length === 0) {
          console.log(
            "Currently we do not have this product, Sorry!"
          );
          //The option for the amount that you wish to purchase needs to go here
          shopping();
        } else {
          inquirer
            .prompt({
              name: "quantity",
              type: "input",
              message: "How many items would you like to purchase?"
            })
            .then(function (answer2) {
              var quantity = answer2.quantity;
              if (quantity > res[0].stock_quantity) {
                console.log(
                  "Our Apologies we only have " +
                  res[0].stock_quantity +
                  " items of the product selected"
                );
                shopping();
              } else {
                console.log("");
                console.log(res[0].products_id + " purchased");
                console.log(quantity + " qty @ $" + res[0].price);
                //This is where Ill be updating the actual stock quanity as things are purchased
                var newQuantity = res[0].stock_quantity - quantity;
                connection.query(
                  "UPDATE products SET stock_quantity = " +
                  newQuantity +
                  " WHERE id = " +
                  res[0].id,
                  function (err, resUpdate) {
                    if (err) throw err;
                    console.log("");
                    console.log("Your Order has been Processed");
                    console.log("Thank you for Shopping with us...!");
                    console.log("");
                    connection.end();
                  }
                );
              }
            });
        }
      });
    });
};

display();