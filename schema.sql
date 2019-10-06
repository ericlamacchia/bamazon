DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR (255) NOT NULL,
department_name VARCHAR (255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quanity INT (10) NOT NULL,
primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Corvette", "Car", 50000.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Ps4", "Electronics", 450.00, 80);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Macbook pro 15 inch", "Electronics", 2400.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Dyson v6", "Appliances", 500.00, 400);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Uplift standing desk", "Furniture", 800.00, 300);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Frozen Buritto", "Food", 900000, 1000);