package com.main.utin.service.impl;

import com.main.utin.dto.DayWiseCountResponse;
import com.main.utin.dto.PrescriptionRequest;
import com.main.utin.dto.PrescriptionResponse;
import com.main.utin.entity.Prescription;
import com.main.utin.entity.User;
import com.main.utin.exception.ResourceNotFoundException;
import com.main.utin.repository.PrescriptionRepository;
import com.main.utin.service.AuthService;
import com.main.utin.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AuthService authService;

    @Override
    @Transactional
    public PrescriptionResponse createPrescription(PrescriptionRequest request) {
        User currentUser = authService.getCurrentUser();

        Prescription prescription = Prescription.builder()
                .prescriptionDate(request.getPrescriptionDate())
                .patientName(request.getPatientName())
                .patientAge(request.getPatientAge())
                .patientGender(request.getPatientGender())
                .diagnosis(request.getDiagnosis())
                .medicines(request.getMedicines())
                .nextVisitDate(request.getNextVisitDate())
                .createdBy(currentUser)
                .build();

        Prescription savedPrescription = prescriptionRepository.save(prescription);
        return mapToResponse(savedPrescription);
    }

    @Override
    @Transactional(readOnly = true)
    public PrescriptionResponse getPrescriptionById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));
        return mapToResponse(prescription);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PrescriptionResponse> getAllPrescriptions() {
        return prescriptionRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PrescriptionResponse> getPrescriptionsByDateRange(LocalDate startDate, LocalDate endDate) {
        return prescriptionRepository.findByDateRange(startDate, endDate).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrescriptionResponse updatePrescription(Long id, PrescriptionRequest request) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));

        prescription.setPrescriptionDate(request.getPrescriptionDate());
        prescription.setPatientName(request.getPatientName());
        prescription.setPatientAge(request.getPatientAge());
        prescription.setPatientGender(request.getPatientGender());
        prescription.setDiagnosis(request.getDiagnosis());
        prescription.setMedicines(request.getMedicines());
        prescription.setNextVisitDate(request.getNextVisitDate());

        Prescription updatedPrescription = prescriptionRepository.save(prescription);
        return mapToResponse(updatedPrescription);
    }

    @Override
    @Transactional
    public void deletePrescription(Long id) {
        if (!prescriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Prescription not found with id: " + id);
        }
        prescriptionRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DayWiseCountResponse> getDayWisePrescriptionCount(LocalDate startDate, LocalDate endDate) {
        List<Object[]> results = prescriptionRepository.getDayWisePrescriptionCount(startDate, endDate);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return results.stream()
                .map(result -> DayWiseCountResponse.builder()
                        .day(((LocalDate) result[0]).format(formatter))
                        .prescriptionCount((Long) result[1])
                        .build())
                .collect(Collectors.toList());
    }

    private PrescriptionResponse mapToResponse(Prescription prescription) {
        return PrescriptionResponse.builder()
                .id(prescription.getId())
                .prescriptionDate(prescription.getPrescriptionDate())
                .patientName(prescription.getPatientName())
                .patientAge(prescription.getPatientAge())
                .patientGender(prescription.getPatientGender())
                .diagnosis(prescription.getDiagnosis())
                .medicines(prescription.getMedicines())
                .nextVisitDate(prescription.getNextVisitDate())
                .createdByUsername(prescription.getCreatedBy().getUsername())
                .createdByFullName(prescription.getCreatedBy().getFullName())
                .createdAt(prescription.getCreatedAt())
                .updatedAt(prescription.getUpdatedAt())
                .build();
    }
}

