package com.clinic.clinic_api.web.exceptions;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "Structure de reponse d'erreur")
public class ErrorResponse {

    @Schema(description = "Horodatage de l'erreur")
    private LocalDateTime timestamp;

    @Schema(description = "Code HTTP de l'erreur", example = "404")
    private int status;

    @Schema(description = "Message d'erreur", example = "Patient non trouve avec l'id : 99")
    private String message;

    public ErrorResponse(int status, String message) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.message = message;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getMessage() { return message; }
}
