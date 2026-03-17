package com.clinic.clinic_api.web.exceptions;

public class PatientNotFoundException extends RuntimeException {

    public PatientNotFoundException(Long id) {
        super("Patient non trouve avec l'id : " + id);
    }

    public PatientNotFoundException(String message) {
        super("Patient non trouve : " + message);
    }
}
