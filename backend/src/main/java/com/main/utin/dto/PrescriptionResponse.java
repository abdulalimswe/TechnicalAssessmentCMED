package com.main.utin.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionResponse {

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate prescriptionDate;

    private String patientName;
    private Integer patientAge;
    private String patientGender;
    private String diagnosis;
    private String medicines;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate nextVisitDate;

    private String createdByUsername;
    private String createdByFullName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}

