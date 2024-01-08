-- SQLBook: Code
-- SQLBook: Code

create table `users` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `pseudo` VARCHAR(255) UNIQUE,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL
);

INSERT INTO `users` (`firstname`, `lastname`, `pseudo`, `email`, `password`, `role`)
VALUES
("John", "Wick", "johnnyBoy", "johnwick@wanadoo.fr", "123456", "admin"),
("Patata", "Doe", "tikaMassala", "patatadoe@wanadoo.fr", "123456", "user")

create table `recipes` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `publicationDate` VARCHAR(255) NOT NULL,
  `picture` VARCHAR(255) NOT NULL,
  `peopleNumber` INT NOT NULL,
  `energyPerPerson` INT NOT NULL,
  `difficulty` VARCHAR(255) NOT NULL,
  `prepTime` INT not NULL
);


CREATE table `ingredients` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `ingredientName` VARCHAR(255) NOT NULL
);


CREATE TABLE `recipes_ingredients` (
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `unite` INT NOT NULL,
  `quantity` INT NOT NULL
);

DROP TABLE `recipes_ingredients`;

CREATE TABLE `cathegories` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
)


CREATE TABLE `recipes_cathegories` (
  `recipe_id` INT NOT NULL,
  `cathegory_id` INT NOT NULL 
)


CREATE TABLE `favorite_Recipes` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id`INT NOT NULL,
  `recipe_id` INT NOT NULL
)


CREATE table `evaluations` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  `comment` VARCHAR(255),
  `note` INT NOT NULL,
  `commentDate` VARCHAR(255) NOT NULL
);


CREATE TABLE `steps` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` INT NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `position` INT NOT NULL
);

