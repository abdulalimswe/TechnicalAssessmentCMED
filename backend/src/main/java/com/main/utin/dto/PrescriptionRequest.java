package com.main.utin.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionRequest {

    @NotNull(message = "Prescription date is required")
    @PastOrPresent(message = "Prescription date cannot be in the future")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate prescriptionDate;

    @NotBlank(message = "Patient name is required")
    @Size(max = 100, message = "Patient name must not exceed 100 characters")
    private String patientName;

    @NotNull(message = "Patient age is required")
    @Min(value = 0, message = "Patient age must be at least 0")
    @Max(value = 150, message = "Patient age must not exceed 150")
    private Integer patientAge;

    @NotBlank(message = "Patient gender is required")
    @Pattern(regexp = "MALE|FEMALE|OTHER", message = "Gender must be MALE, FEMALE, or OTHER")
    private String patientGender;

    @Size(max = 2000, message = "Diagnosis must not exceed 2000 characters")
    private String diagnosis;

    @Size(max = 2000, message = "Medicines must not exceed 2000 characters")
    private String medicines;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate nextVisitDate;
}

