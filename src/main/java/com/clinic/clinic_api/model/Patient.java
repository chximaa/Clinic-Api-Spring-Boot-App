package com.clinic.clinic_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "PATIENT")
@Schema(description = "Entite representant un patient de la clinique")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identifiant unique du patient", example = "1")
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100, message = "Le nom doit contenir entre 2 et 100 caracteres")
    @Schema(description = "Nom du patient", example = "Dupont")
    private String nom;

    @NotBlank(message = "Le prenom est obligatoire")
    @Size(min = 2, max = 100, message = "Le prenom doit contenir entre 2 et 100 caracteres")
    @Schema(description = "Prenom du patient", example = "Jean")
    private String prenom;

    @NotNull(message = "Le numero de securite sociale est obligatoire")
    @Pattern(regexp = "\\d{15}", message = "Le numero de secu doit contenir exactement 15 chiffres")
    @Schema(description = "Numero de securite sociale (15 chiffres)", example = "175126012345699")
    private String numeroSecu;

    @JsonIgnore
    @Schema(description = "Diagnostic confidentiel (masque dans l'API)", hidden = true)
    private String diagnosticConfidentiel;

    // ===== Constructeurs =====

    public Patient() {}

    public Patient(String nom, String prenom, String numeroSecu, String diagnosticConfidentiel) {
        this.nom = nom;
        this.prenom = prenom;
        this.numeroSecu = numeroSecu;
        this.diagnosticConfidentiel = diagnosticConfidentiel;
    }

    // ===== Getters & Setters =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNumeroSecu() { return numeroSecu; }
    public void setNumeroSecu(String numeroSecu) { this.numeroSecu = numeroSecu; }

    public String getDiagnosticConfidentiel() { return diagnosticConfidentiel; }
    public void setDiagnosticConfidentiel(String diagnosticConfidentiel) {
        this.diagnosticConfidentiel = diagnosticConfidentiel;
    }

    @Override
    public String toString() {
        return "Patient{id=" + id + ", nom='" + nom + "', prenom='" + prenom +
               "', numeroSecu='" + numeroSecu + "'}";
    }
}
