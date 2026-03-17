package com.clinic.clinic_api.service;

import com.clinic.clinic_api.dao.PatientRepository;
import com.clinic.clinic_api.model.Patient;
import com.clinic.clinic_api.web.exceptions.PatientNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    // Injection par constructeur (bonne pratique)
    private final PatientRepository repository;

    public PatientService(PatientRepository repository) {
        this.repository = repository;
    }

    // ===== READ =====

    public List<Patient> getAllPatients() {
        return repository.findAll();
    }

    public Patient getPatientById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));
    }

    // ===== CREATE =====

    public Patient createPatient(Patient patient) {
        return repository.save(patient);
    }

    // ===== UPDATE =====

    public Patient updatePatient(Long id, Patient updated) {
        Patient existing = getPatientById(id); // lance 404 si absent
        existing.setNom(updated.getNom());
        existing.setPrenom(updated.getPrenom());
        existing.setNumeroSecu(updated.getNumeroSecu());
        existing.setDiagnosticConfidentiel(updated.getDiagnosticConfidentiel());
        return repository.save(existing);
    }

    // ===== DELETE =====

    public void deletePatient(Long id) {
        getPatientById(id); // verifie que le patient existe, sinon 404
        repository.deleteById(id);
    }

    // ===== RECHERCHE METIER =====

    public Patient findByNumeroSecu(String numeroSecu) {
        return repository.findByNumeroSecu(numeroSecu)
                .orElseThrow(() -> new PatientNotFoundException("numero secu = " + numeroSecu));
    }

    public List<Patient> findByNom(String nom) {
        return repository.rechercherParNom(nom);
    }
}
