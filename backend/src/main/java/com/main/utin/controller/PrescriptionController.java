package com.main.utin.controller;

import com.main.utin.dto.DayWiseCountResponse;
import com.main.utin.dto.PrescriptionRequest;
import com.main.utin.dto.PrescriptionResponse;
import com.main.utin.service.PrescriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

/**
 * REST Controller for prescription operations
 */
@RestController
@RequestMapping("/api/v1/prescription")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Prescription", description = "Endpoints for prescription management")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    /**
     * Create a new prescription
     */
    @PostMapping
    @Operation(summary = "Create prescription", description = "Create a new prescription entry")
    public ResponseEntity<PrescriptionResponse> createPrescription(
            @Valid @RequestBody PrescriptionRequest request) {
        PrescriptionResponse response = prescriptionService.createPrescription(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get prescription by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get prescription by ID", description = "Retrieve a specific prescription by its ID")
    public ResponseEntity<PrescriptionResponse> getPrescriptionById(
            @Parameter(description = "Prescription ID") @PathVariable Long id) {
        PrescriptionResponse response = prescriptionService.getPrescriptionById(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all prescriptions (with optional date range filter)
     */
    @GetMapping
    @Operation(summary = "Get all prescriptions", description = "Get all prescriptions with optional date range filter")
    public ResponseEntity<List<PrescriptionResponse>> getAllPrescriptions(
            @Parameter(description = "Start date (default: first day of current month)")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "End date (default: last day of current month)")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        // Default to current month if dates not provided
        if (startDate == null || endDate == null) {
            YearMonth currentMonth = YearMonth.now();
            startDate = currentMonth.atDay(1);
            endDate = currentMonth.atEndOfMonth();
        }

        List<PrescriptionResponse> response = prescriptionService.getPrescriptionsByDateRange(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    /**
     * Update a prescription
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update prescription", description = "Update an existing prescription")
    public ResponseEntity<PrescriptionResponse> updatePrescription(
            @Parameter(description = "Prescription ID") @PathVariable Long id,
            @Valid @RequestBody PrescriptionRequest request) {
        PrescriptionResponse response = prescriptionService.updatePrescription(id, request);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete a prescription
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete prescription", description = "Delete a prescription by ID")
    public ResponseEntity<Void> deletePrescription(
            @Parameter(description = "Prescription ID") @PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get day-wise prescription count
     */
    @GetMapping("/report/day-wise-count")
    @Operation(summary = "Day-wise prescription count", description = "Get prescription count grouped by day")
    public ResponseEntity<List<DayWiseCountResponse>> getDayWiseCount(
            @Parameter(description = "Start date (default: first day of current month)")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @Parameter(description = "End date (default: last day of current month)")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        // Default to current month if dates not provided
        if (startDate == null || endDate == null) {
            YearMonth currentMonth = YearMonth.now();
            startDate = currentMonth.atDay(1);
            endDate = currentMonth.atEndOfMonth();
        }

        List<DayWiseCountResponse> response = prescriptionService.getDayWisePrescriptionCount(startDate, endDate);
        return ResponseEntity.ok(response);
    }
}

