-- Active: 1701095195024@@127.0.0.1@3306@birdies
-- SQLBook: Code
-- SQLBook: Code
create table `users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `pseudo` VARCHAR(255) UNIQUE,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255)
);

create table `recipes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `publicationDate` VARCHAR(255) NOT NULL,
    `picture` INT NOT NULL,
    `peopleNumber` INT NOT NULL,
    `energyPerPerson` INT NOT NULL,
    `difficulty` VARCHAR(255) NOT NULL,
    `prepTime` INT not NULL
);


CREATE table `upload` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    UNIQUE(url),
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);

alter TABLE
    `recipes`
MODIFY
    picture INT,
ADD
    CONSTRAINT fk_picture_upload_id FOREIGN KEY (picture) REFERENCES upload(id);

CREATE table `ingredients` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ingredientName` VARCHAR(255) NOT NULL
);

CREATE TABLE `recipes_ingredients` (
    `recipe_id` INT NOT NULL,
    `ingredient_id` INT NOT NULL,
    `unite` VARCHAR(255) NOT NULL,
    `quantity` INT NOT NULL,
    Foreign Key (`recipe_id`) REFERENCES recipes(id),
    Foreign Key (`ingredient_id`) REFERENCES ingredients(id)
);

CREATE TABLE `cathegories` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `recipes_cathegories` (
    `recipe_id` INT NOT NULL,
    `cathegory_id` INT NOT NULL,
    Foreign Key (`recipe_id`) REFERENCES recipes(id),
    Foreign Key (`cathegory_id`) REFERENCES cathegories(id)
);

ALTER TABLE
    `recipes_cathegories`
ADD
    CONSTRAINT `fk_recipes_cathegories_recipe_id` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

CREATE TABLE `favorite_Recipes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (recipe_id) REFERENCES recipes(id)
);

CREATE table `evaluations` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    `comment` VARCHAR(255),
    `note` INT NOT NULL,
    `commentDate` timestamp default CURRENT_TIMESTAMP,
    `transformedDate` VARCHAR(255),
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE `steps` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `recipe_id` INT NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `position` INT NOT NULL,
    Foreign Key (recipe_id) REFERENCES recipes(id)
);

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Très facile");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Facile");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Moyen");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Difficile");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("-30 minutes");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("-1 heure");
