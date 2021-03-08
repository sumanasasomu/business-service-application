CREATE SCHEMA office_database;

CREATE TABLE office_database.customers ( 
	customer_id          int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	name                 varchar(100)  NOT NULL    ,
	phone_number         varchar(20)  NOT NULL    ,
	email_id             varchar(30)      ,
	CONSTRAINT `Unq_customers` UNIQUE ( email_id, name, phone_number ) 
 );

CREATE INDEX idx_customers ON office_database.customers ( name, phone_number );

CREATE TABLE office_database.dealers ( 
	dealer_id            int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	dealer_name          varchar(100)  NOT NULL    ,
	phone_number         varchar(10)      ,
	address              varchar(100)      ,
	company_name         varchar(100)      
 );

CREATE INDEX idx_dealers ON office_database.dealers ( dealer_name, phone_number );

CREATE TABLE office_database.payments ( 
	payment_id           int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	payment_type         varchar(10)  NOT NULL    
 );

CREATE TABLE office_database.service_type ( 
	service_id           int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	service_name         varchar(10)  NOT NULL    
 );

CREATE TABLE office_database.stock_purchase ( 
	purchase_id          int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	purchase_date        date  NOT NULL    ,
	tyre_id              int  NOT NULL    ,
	dealer               int  NOT NULL    ,
	num_tyres            int  NOT NULL    ,
	cost                 int  NOT NULL    ,
	CONSTRAINT fk_stock_purchase_dealers UNIQUE ( dealer ) 
 );

CREATE TABLE office_database.tyre_brand ( 
	brand_id             int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	brand_name           varchar(20)  NOT NULL    ,
	CONSTRAINT unq_tyre_brand UNIQUE ( brand_name ) 
 );

CREATE TABLE office_database.vehicles ( 
	vehicle_number       varchar(20)  NOT NULL    PRIMARY KEY,
	car_model_name       varchar(20)      ,
	customer_id          int  NOT NULL    ,
	last_visit           date      
 );

CREATE INDEX customer_id ON office_database.vehicles ( customer_id );

CREATE TABLE office_database.stock ( 
	tyre_id              int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	tyre_size            varchar(10)  NOT NULL    ,
	brand_id             int  NOT NULL    ,
	quantity             int  NOT NULL    ,
	CONSTRAINT unq_stock UNIQUE ( tyre_size, brand_id ) 
 );

CREATE INDEX brand_id ON office_database.stock ( brand_id );

CREATE TABLE office_database.transactions ( 
	transaction_id       int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	transaction_date     date  NOT NULL    ,
	customer_id          int  NOT NULL    ,
	vehicle_id           varchar(10)  NOT NULL    ,
	service_type         int  NOT NULL    ,
	is_tyre_sale         boolean  NOT NULL    ,
	payment_type         int  NOT NULL    ,
	is_payment_done      boolean  NOT NULL    ,
	payment_id           varchar(100)      ,
	amount               int  NOT NULL    ,
	CONSTRAINT service_type UNIQUE ( service_type ) 
 );

CREATE INDEX customer_id ON office_database.transactions ( customer_id );

CREATE INDEX payment_type ON office_database.transactions ( payment_type );

CREATE INDEX vehicle_id ON office_database.transactions ( vehicle_id );

CREATE TABLE office_database.tyres_transactions ( 
	transaction_id       int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
	tyre_id              int  NOT NULL    ,
	num_tyres            int  NOT NULL    ,
	amount               int  NOT NULL    
 );

CREATE INDEX tyre_id ON office_database.tyres_transactions ( tyre_id );

CREATE  PROCEDURE `GetCustomerDetailsByName`(IN customer_name varchar(100))
BEGIN
SELECT *  FROM customers
where name = customer_name;
END

CREATE  PROCEDURE `GetCustomerDetailsByPhone`(IN phn_number varchar(10))
BEGIN
SELECT *  FROM customers
where phone_number = phn_number;
END

CREATE  PROCEDURE `GetCustomerDetailsByVehicle`(IN vehicle_number varchar(20))
BEGIN
SELECT *  FROM customers, vehicles
where vehicle_id = vehicle_number
and customers.customer_id = vehicle.customer_id;
END

CREATE  PROCEDURE `GetStock`()
BEGIN
SELECT *  FROM stock;
END

CREATE TRIGGER office_database.update_stock_on_sale AFTER INSERT ON tyres_transactions FOR EACH ROW update stock 
		set quantity = quantity-NEW.num_tyres
		where stock.tyre_id = NEW.tyre_id;

ALTER TABLE office_database.stock ADD CONSTRAINT fk_stock_tyre_brand FOREIGN KEY ( brand_id ) REFERENCES office_database.tyre_brand( brand_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.stock_purchase ADD CONSTRAINT fk_stock_purchase_dealers FOREIGN KEY ( dealer ) REFERENCES office_database.dealers( dealer_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.transactions ADD CONSTRAINT fk_transactions_customers FOREIGN KEY ( customer_id ) REFERENCES office_database.customers( customer_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.transactions ADD CONSTRAINT fk_transactions_payments FOREIGN KEY ( payment_type ) REFERENCES office_database.payments( payment_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.transactions ADD CONSTRAINT fk_transactions_service_type FOREIGN KEY ( service_type ) REFERENCES office_database.service_type( service_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.transactions ADD CONSTRAINT fk_transactions_vehicles FOREIGN KEY ( vehicle_id ) REFERENCES office_database.vehicles( vehicle_number ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.tyres_transactions ADD CONSTRAINT fk_tyres_transactions_stock FOREIGN KEY ( tyre_id ) REFERENCES office_database.stock( tyre_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.tyres_transactions ADD CONSTRAINT fk_tyres_transactions_transactions FOREIGN KEY ( transaction_id ) REFERENCES office_database.transactions( transaction_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE office_database.vehicles ADD CONSTRAINT fk_vehicles_customers FOREIGN KEY ( customer_id ) REFERENCES office_database.customers( customer_id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 20, 'Myrtie57', '387721', 'Alyson57@yahoo.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 19, 'Kavon.Labadie48', '8983413', 'Birdie_Hills77@yahoo.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 21, 'Reynold94', '5125570', 'Delfina37@hotmail.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 28, 'Terrance.Pacocha', '362-360-3338', 'Destiney_Cole@gmail.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 26, 'Cordell_McKenzie', '5662942', 'Hassan.Mann@gmail.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 25, 'Anissa.Rice1', '5591871', 'Jaclyn.Rippin@hotmail.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 23, 'Shawna59', '4124911', 'Judson83@hotmail.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 27, 'Benedict_Koelpin', '3396469', 'Justina_Kuphal@gmail.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 22, 'Josiah.Klein52', '1702698', 'Laurine.Reichert@yahoo.com');
INSERT INTO office_database.customers( customer_id, name, phone_number, email_id ) VALUES ( 24, 'Oliver48', '7363731', 'Ressie84@gmail.com');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 9, 'abc');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 11, 'abc1');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 13, 'abc3');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 15, 'abc4');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 1, 'apollo');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 2, 'bridgestone');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 5, 'ceat');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 17, 'DDS');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 4, 'jk');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 16, 'Jr.');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 6, 'micheline');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 3, 'mrf');
INSERT INTO office_database.tyre_brand( brand_id, brand_name ) VALUES ( 7, 'yakohama');
INSERT INTO office_database.vehicles( vehicle_number, car_model_name, customer_id, last_visit ) VALUES ( '100', 'a', 20, null);
INSERT INTO office_database.vehicles( vehicle_number, car_model_name, customer_id, last_visit ) VALUES ( '86779', null, 28, null);
INSERT INTO office_database.vehicles( vehicle_number, car_model_name, customer_id, last_visit ) VALUES ( 'A', null, 27, null);
INSERT INTO office_database.stock( tyre_id, tyre_size, brand_id, quantity ) VALUES ( 19, 'abcd', 5, 0);
