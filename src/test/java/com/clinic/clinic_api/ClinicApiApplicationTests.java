package com.clinic.clinic_api;

import com.clinic.clinic_api.dao.PatientRepository;
import com.clinic.clinic_api.model.Patient;
import com.clinic.clinic_api.service.PatientService;
import com.clinic.clinic_api.web.exceptions.PatientNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ClinicApiApplicationTests {

    @Autowired
    private PatientService patientService;

    @Autowired
    private PatientRepository patientRepository;

    @Test
    void contextLoads() {
        // Verifie que le contexte Spring se charge correctement
        assertNotNull(patientService);
    }

    @Test
    void testGetAllPatientsReturnsFivePatients() {
        List<Patient> patients = patientService.getAllPatients();
        assertEquals(5, patients.size(), "Il doit y avoir 5 patients en base (data.sql)");
    }

    @Test
    void testGetPatientByIdFound() {
        Patient p = patientService.getPatientById(1L);
        assertNotNull(p);
        assertEquals("Dupont", p.getNom());
    }

    @Test
    void testGetPatientByIdNotFound() {
        assertThrows(PatientNotFoundException.class, () -> patientService.getPatientById(9999L));
    }

    @Test
    void testCreateAndDeletePatient() {
        Patient newPatient = new Patient("TestNom", "TestPrenom", "123456789012345", "Diagnostic test");
        Patient saved = patientService.createPatient(newPatient);
        assertNotNull(saved.getId());

        patientService.deletePatient(saved.getId());
        assertThrows(PatientNotFoundException.class, () -> patientService.getPatientById(saved.getId()));
    }

    @Test
    void testFindByNumeroSecu() {
        Patient p = patientService.findByNumeroSecu("175126012345699");
        assertNotNull(p);
        assertEquals("Dupont", p.getNom());
    }

    @Test
    void testDiagnosticConfidentielIsNotNull() {
        // Le diagnostic confidentiel doit exister en base mais @JsonIgnore l'efface du JSON
        Patient p = patientRepository.findById(1L).orElseThrow();
        assertNotNull(p.getDiagnosticConfidentiel(), "Le diagnostic confidentiel doit etre present en base");
    }
}
