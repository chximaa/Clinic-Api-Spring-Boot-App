package com.clinic.clinic_api.web.controller;

import com.clinic.clinic_api.model.Patient;
import com.clinic.clinic_api.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@Tag(name = "Patients", description = "API de gestion des patients de la clinique medicale")
public class PatientController {

    // Injection par constructeur
    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    // ===== GET ALL =====
    @GetMapping
    @Operation(summary = "Obtenir tous les patients", description = "Retourne la liste complete de tous les patients")
    @ApiResponse(responseCode = "200", description = "Liste retournee avec succes")
    public ResponseEntity<List<Patient>> getAll() {
        return ResponseEntity.ok(service.getAllPatients());
    }

    // ===== GET BY ID =====
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un patient par ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Patient trouve"),
        @ApiResponse(responseCode = "404", description = "Patient non trouve", content = @Content(schema = @Schema(implementation = com.clinic.clinic_api.web.exceptions.ErrorResponse.class)))
    })
    public ResponseEntity<Patient> getById(
            @Parameter(description = "ID du patient", example = "1")
            @PathVariable Long id) {
        return ResponseEntity.ok(service.getPatientById(id));
    }

    // ===== CREATE =====
    @PostMapping
    @Operation(summary = "Creer un nouveau patient")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Patient cree avec succes"),
        @ApiResponse(responseCode = "400", description = "Donnees invalides")
    })
    public ResponseEntity<Patient> create(@Valid @RequestBody Patient patient) {
        Patient created = service.createPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ===== UPDATE =====
    @PutMapping("/{id}")
    @Operation(summary = "Modifier un patient existant")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Patient modifie avec succes"),
        @ApiResponse(responseCode = "404", description = "Patient non trouve"),
        @ApiResponse(responseCode = "400", description = "Donnees invalides")
    })
    public ResponseEntity<Patient> update(
            @PathVariable Long id,
            @Valid @RequestBody Patient patient) {
        return ResponseEntity.ok(service.updatePatient(id, patient));
    }

    // ===== DELETE =====
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un patient")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Patient supprime"),
        @ApiResponse(responseCode = "404", description = "Patient non trouve")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    // ===== SEARCH BY NUMERO SECU =====
    @GetMapping("/search/secu")
    @Operation(summary = "Rechercher par numero de securite sociale")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Patient trouve"),
        @ApiResponse(responseCode = "404", description = "Patient non trouve")
    })
    public ResponseEntity<Patient> searchBySecu(
            @Parameter(description = "Numero de secu (15 chiffres)", example = "175126012345699")
            @RequestParam String secu) {
        return ResponseEntity.ok(service.findByNumeroSecu(secu));
    }

    // ===== SEARCH BY NOM =====
    @GetMapping("/search/nom")
    @Operation(summary = "Rechercher des patients par nom (partiel)")
    @ApiResponse(responseCode = "200", description = "Liste de patients correspondants")
    public ResponseEntity<List<Patient>> searchByNom(
            @Parameter(description = "Nom ou partie du nom", example = "Dup")
            @RequestParam String nom) {
        return ResponseEntity.ok(service.findByNom(nom));
    }
}
