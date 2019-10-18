-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema quiz
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema quiz
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quiz` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema quiz0
-- -----------------------------------------------------
USE `quiz` ;

-- -----------------------------------------------------
-- Table `quiz`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz`.`usuario` (
                                                `email` VARCHAR(200) NOT NULL,
                                                `senha` VARCHAR(45) NOT NULL,
                                                `nome` VARCHAR(50) NOT NULL,
                                                `nivel` INT NOT NULL,
                                                `id` INT NOT NULL AUTO_INCREMENT,
                                                PRIMARY KEY (`id`))
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quiz`.`quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz`.`quiz` (
                                             `nome` VARCHAR(200) NOT NULL,
                                             `id` INT NOT NULL AUTO_INCREMENT,
                                             `usuario_id` INT NOT NULL,
                                             PRIMARY KEY (`id`),
                                             INDEX `fk_quiz_usuario_idx` (`usuario_id` ASC),
                                             CONSTRAINT `fk_quiz_usuario`
                                                 FOREIGN KEY (`usuario_id`)
                                                     REFERENCES `quiz`.`usuario` (`id`)
                                                     ON DELETE NO ACTION
                                                     ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quiz`.`perguntas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz`.`perguntas` (
                                                  `titulo` VARCHAR(200) NOT NULL,
                                                  `quiz_id` INT NOT NULL,
                                                  `id` INT NOT NULL AUTO_INCREMENT,
                                                  PRIMARY KEY (`id`),
                                                  INDEX `fk_perguntas_quiz1_idx` (`quiz_id` ASC),
                                                  CONSTRAINT `fk_perguntas_quiz1`
                                                      FOREIGN KEY (`quiz_id`)
                                                          REFERENCES `quiz`.`quiz` (`id`)
                                                          ON DELETE NO ACTION
                                                          ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quiz`.`alternativas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz`.`alternativas` (
                                                     `texto` VARCHAR(200) NOT NULL,
                                                     `correta` INT NOT NULL,
                                                     `id` INT NOT NULL AUTO_INCREMENT,
                                                     `perguntas_id` INT NOT NULL,
                                                     PRIMARY KEY (`id`),
                                                     INDEX `fk_alternativas_perguntas1_idx` (`perguntas_id` ASC),
                                                     CONSTRAINT `fk_alternativas_perguntas1`
                                                         FOREIGN KEY (`perguntas_id`)
                                                             REFERENCES `quiz`.`perguntas` (`id`)
                                                             ON DELETE NO ACTION
                                                             ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `quiz`.`resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz`.`resposta` (
                                                 `id` INT NOT NULL AUTO_INCREMENT,
                                                 `usuario_id` INT NOT NULL,
                                                 `alternativas_id` INT NOT NULL,
                                                 `data_cadastro` DATETIME NOT NULL,
                                                 PRIMARY KEY (`id`),
                                                 INDEX `fk_resposta_usuario1_idx` (`usuario_id` ASC),
                                                 INDEX `fk_resposta_alternativas1_idx` (`alternativas_id` ASC),
                                                 CONSTRAINT `fk_resposta_usuario1`
                                                     FOREIGN KEY (`usuario_id`)
                                                         REFERENCES `quiz`.`usuario` (`id`)
                                                         ON DELETE NO ACTION
                                                         ON UPDATE NO ACTION,
                                                 CONSTRAINT `fk_resposta_alternativas1`
                                                     FOREIGN KEY (`alternativas_id`)
                                                         REFERENCES `quiz`.`alternativas` (`id`)
                                                         ON DELETE NO ACTION
                                                         ON UPDATE NO ACTION)
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
