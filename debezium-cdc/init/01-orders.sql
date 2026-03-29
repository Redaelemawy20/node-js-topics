CREATE USER IF NOT EXISTS 'debezium'@'%' IDENTIFIED BY 'dbz';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'debezium'@'%';
FLUSH PRIVILEGES;

USE orders;

CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(50),
    quantity INT,
    status VARCHAR(20)
);

INSERT INTO orders (product_name, quantity, status) VALUES ('Book', 2, 'pending');
INSERT INTO orders (product_name, quantity, status) VALUES ('Laptop', 1, 'pending');
