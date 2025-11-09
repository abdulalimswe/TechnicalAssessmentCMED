package com.main.utin.service;

import com.main.utin.dto.DayWiseCountResponse;
import com.main.utin.dto.PrescriptionRequest;
import com.main.utin.dto.PrescriptionResponse;

import java.time.LocalDate;
import java.util.List;

public interface PrescriptionService {

    PrescriptionResponse createPrescription(PrescriptionRequest request);

    PrescriptionResponse getPrescriptionById(Long id);

    List<PrescriptionResponse> getAllPrescriptions();

    List<PrescriptionResponse> getPrescriptionsByDateRange(LocalDate startDate, LocalDate endDate);

    PrescriptionResponse updatePrescription(Long id, PrescriptionRequest request);

    void deletePrescription(Long id);

    List<DayWiseCountResponse> getDayWisePrescriptionCount(LocalDate startDate, LocalDate endDate);
}

