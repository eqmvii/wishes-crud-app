-- create the new db

DROP DATABASE IF EXISTS wishes_crud_app_db;
CREATE DATABASE wishes_crud_app_db;
USE wishes_crud_app_db;

CREATE TABLE wishes (id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), wish varchar(255) NOT NULL);

INSERT INTO wishes (wish) VALUES ('$1,000,000...');
INSERT INTO wishes (wish) VALUES ('a penguin butler');
-- escape apostrophe with... another apostrophe, ok?
INSERT INTO wishes (wish) VALUES ('a pint of Ben & Jerry''s Whirled Peace ice cream');

-- test db creation and seeding
SELECT * FROM wishes;
