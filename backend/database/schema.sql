-- SQLBook: Code
-- SQLBook: Code

create table `user` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL
)



INSERT INTO `user` (`firstname`, `lastname`, `email`, `password`, `role`)
VALUES
("John", "Wick", "johnwick@wanadoo.fr", "123456", "admin"),
("Patata", "Doe", "patatadoe@wanadoo.fr", "123456", "user");