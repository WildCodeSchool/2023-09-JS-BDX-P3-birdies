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

INSERT IGNORE INTO
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

INSERT IGNORE INTO
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
        NULL,
        "4",
        "188",
        "facile",
        "30"
    ),
    (
        "2",
        "Pâtes bolognaise",
        "08/01/2024",
        NULL,
        "4",
        "150",
        "facile",
        "90"
    ),
    (
        "3",
        "Pâtes au saumon",
        "08/01/2024",
        NULL,
        "4",
        "100",
        "facile",
        "25"
    );

INSERT IGNORE INTO
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
        null,
        "4",
        "185",
        "intermédiaire",
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

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Gourmand");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Festif");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Sportif");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("De saison");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("BBQ");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Végétarien");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Sans lactose");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Végan");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Sans gluten");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Entrée");

INSERT IGNORE INTO
    `cathegories` (`name`)
VALUES
    ("Snack"),
    ("Plat");

INSERT IGNORE INTO
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

INSERT IGNORE INTO
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
        null,
        "4",
        "240",
        "Facile",
        "50"
    ),
    (
        "6",
        "Recette soufflé au Grand Marnier",
        "11/01/2024",
        null,
        "6",
        "120",
        "Difficile",
        "40"
    ),
    (
        "7",
        " Recette pastilla de pigeon aux raisins blancs",
        "11/01/2024",
        null,
        "6",
        "200",
        "Difficile",
        "45"
    );

UPDATE IGNORE
    `recipes`
SET
    `name` = "Soufflé au Grand Marnier"
WHERE
    `id` = 6;

UPDATE IGNORE
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

