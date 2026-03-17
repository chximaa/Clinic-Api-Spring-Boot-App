DROP TABLE IF EXISTS PATIENT;

CREATE TABLE PATIENT (
    id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom                     VARCHAR(100) NOT NULL,
    prenom                  VARCHAR(100) NOT NULL,
    numero_secu             VARCHAR(15)  NOT NULL UNIQUE,
    diagnostic_confidentiel VARCHAR(500)
);
