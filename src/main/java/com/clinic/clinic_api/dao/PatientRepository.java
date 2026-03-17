package com.clinic.clinic_api.dao;

import com.clinic.clinic_api.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Spring comprend automatiquement le nom de la methode
    Optional<Patient> findByNumeroSecu(String numeroSecu);

    // Requete JPQL explicite (exemple de requete personnalisee)
    @Query("SELECT p FROM Patient p WHERE LOWER(p.nom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    List<Patient> rechercherParNom(@Param("nom") String nom);

    // Requete pour trouver par nom ET prenom
    @Query("SELECT p FROM Patient p WHERE LOWER(p.nom) = LOWER(:nom) AND LOWER(p.prenom) = LOWER(:prenom)")
    Optional<Patient> findByNomAndPrenom(@Param("nom") String nom, @Param("prenom") String prenom);
}
