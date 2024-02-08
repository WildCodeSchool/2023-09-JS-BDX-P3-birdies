-- Active: 1701095195024@@127.0.0.1@3306@birdies
-- SQLBook: Code
-- SQLBook: Code
create table IF NOT EXISTS `users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `pseudo` VARCHAR(255) UNIQUE,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255)
);

CREATE table IF NOT EXISTS `upload` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    UNIQUE(url),
    created_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table IF NOT EXISTS  `recipes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `publicationDate` VARCHAR(255) NOT NULL,
    `picture` INT,
    `peopleNumber` INT NOT NULL,
    `energyPerPerson` INT NOT NULL,
    `difficulty` VARCHAR(255) NOT NULL,
    `prepTime` INT not NULL,
    FOREIGN KEY (picture) REFERENCES upload(id)
);

CREATE table IF NOT EXISTS `ingredients` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ingredientName` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipes_ingredients` (
    `recipe_id` INT NOT NULL,
    `ingredient_id` INT NOT NULL,
    `unite` VARCHAR(255) NOT NULL,
    `quantity` INT NOT NULL,
    Foreign Key (`recipe_id`) REFERENCES recipes(id),
    Foreign Key (`ingredient_id`) REFERENCES ingredients(id)
);

CREATE TABLE IF NOT EXISTS `cathegories` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipes_cathegories` (
    `recipe_id` INT NOT NULL,
    `cathegory_id` INT NOT NULL,
    Foreign Key (`recipe_id`) REFERENCES recipes(id)  ON DELETE CASCADE,
    Foreign Key (`cathegory_id`) REFERENCES cathegories(id)
);

CREATE TABLE IF NOT EXISTS `favorite_recipes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `recipe_id` INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (recipe_id) REFERENCES recipes(id)
);

CREATE table IF NOT EXISTS `evaluations` (
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

CREATE TABLE IF NOT EXISTS `steps` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `recipe_id` INT NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `position` INT NOT NULL,
    Foreign Key (recipe_id) REFERENCES recipes(id)
);

INSERT IGNORE INTO
    `cathegories`
VALUES
    (1, "Très facile"),
    (2, "Facile"),
    (3, "Moyen"),
    (4, "Difficile"),
    (5, "-30 minutes"),
    (6, "-1 heure");
