-- Active: 1704703244465@@127.0.0.1@3306@birdies
-- SQLBook: Code
-- SQLBook: Code
create table `users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `firstname` VARCHAR(255),
    `lastname` VARCHAR(255),
    `pseudo` VARCHAR(255) UNIQUE,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL
);

INSERT INTO
    `users` (
        `firstname`,
        `lastname`,
        `pseudo`,
        `email`,
        `password`,
        `role`
    )
VALUES
    (
        "John",
        "Wick",
        "johnnyBoy",
        "johnwick@wanadoo.fr",
        "123456",
        "admin"
    ),
    (
        "Patata",
        "Doe",
        "tikaMassala",
        "patatadoe@wanadoo.fr",
        "123456",
        "user"
    );

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

CREATE table `upload` (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    UNIQUE(url),
    created_at TIMESTAMP default CURRENT_TIMESTAMP
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

CREATE TABLE `cathegories` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `recipes_cathegories` (
    `recipe_id` INT NOT NULL,
    `cathegory_id` INT NOT NULL
);

CREATE TABLE `favorite_Recipes` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `recipe_id` INT NOT NULL
);

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

INSERT INTO
    `recipes` (
        `userId`,
        `name`,
        `publicationDate`,
        `picture`,
        `peopleNumber`,
        `energyPerPerson`,
        `difficulty`,
        `prepTime`
    )
VALUES
    (
        "1",
        "Pâtes carbonara",
        "08/01/2024",
        "null",
        "4",
        "188",
        "facile",
        "30"
    ),
    (
        "2",
        "Pâtes bolognaise",
        "08/01/2024",
        "null",
        "4",
        "150",
        "facile",
        "90"
    ),
    (
        "3",
        "Pâtes au saumon",
        "08/01/2024",
        "null",
        "4",
        "100",
        "facile",
        "25"
    );

INSERT INTO
    `recipes` (
        `userId`,
        `name`,
        `publicationDate`,
        `picture`,
        `peopleNumber`,
        `energyPerPerson`,
        `difficulty`,
        `prepTime`
    )
VALUES
    (
        "4",
        "Pâtes au pesto",
        "10/01/2024",
        "null",
        "4",
        "185",
        "intermédiare",
        "45"
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

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Gourmand");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Festif");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Sportif");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("De saison");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("BBQ");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Végétarien");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Sans lactose");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Végan");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Sans gluten");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Entrée");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Snack"),
    ("Plat");

INSERT INTO
    `cathegories` (`name`)
VALUES
    ("Dessert"),
    ("Boissons"),
    ("Français"),
    ("Asiatique"),
    ("Méditerranéen"),
    ("Oriental"),
    ("Caribéen"),
    ("Hispanique"),
    ("USA"),
    ("Québecois");

ALTER TABLE
    `recipes`
ADD
    `Gender` VARCHAR(255);

ALTER TABLE
    `recipes` DROP `Gender`;

INSERT INTO
    `recipes` (
        `userId`,
        `name`,
        `publicationDate`,
        `picture`,
        `peopleNumber`,
        `energyPerPerson`,
        `difficulty`,
        `prepTime`
    )
VALUES
    (
        "5",
        "Croziflette",
        "11/01/2024",
        "null",
        "4",
        "240",
        "Facile",
        "50"
    ),
    (
        "6",
        "Recette soufflé au Grand Marnier",
        "11/01/2024",
        "null",
        "6",
        "120",
        "Difficile",
        "40"
    ),
    (
        "7",
        " Recette pastilla de pigeon aux raisins blancs",
        "11/01/2024",
        "null",
        "6",
        "200",
        "Difficile",
        "45"
    );

UPDATE
    `recipes`
SET
    `name` = "Soufflé au Grand Marnier"
WHERE
    `id` = 6;

UPDATE
    `recipes`
SET
    `name` = "Pastilla de pigeon aux raisins blancs"
WHERE
    `id` = 7;

SELECT
    recipes.name,
    cathegories.name
FROM
    recipes
    JOIN cathegories ON recipes.difficulty = cathegories.name;

UPDATE
    `recipes`
SET
    `difficulty` = "Très facile"
WHERE
    `id` = 4;

DELETE FROM
    `cathegories`
WHERE
    `id` = 1;

DELETE FROM
    `cathegories`
WHERE
    `id` = 2;

DELETE FROM
    `cathegories`
WHERE
    `id` = 3;

DELETE FROM
    `cathegories`
WHERE
    `id` = 4;

INSERT INTO
    `recipes_cathegories` (recipe_id, cathegory_id)
VALUES
    (1, 7),
    (2, 9),
    (3, 23);

INSERT INTO
    `recipes_cathegories` (recipe_id, cathegory_id)
VALUES
    (1, 18),
    (2, 13),
    (3, 9),
    (3, 11),
    (2, 26),
    (1, 20);