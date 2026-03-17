package com.clinic.clinic_api;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI clinicOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Clinic API - Gestion des Patients")
                        .description("Microservice Spring Boot pour la gestion des patients d'une clinique medicale. " +
                                "Projet FSBM - Universite Hassan II de Casablanca.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipe Clinique")
                                .email("clinique@fsbm.ma")));
    }
}
