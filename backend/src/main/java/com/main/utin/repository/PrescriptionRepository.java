package com.main.utin.repository;
import com.main.utin.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    @Query("SELECT p FROM Prescription p WHERE p.prescriptionDate BETWEEN :startDate AND :endDate ORDER BY p.prescriptionDate DESC")
    List<Prescription> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("SELECT p.prescriptionDate as day, COUNT(p) as count FROM Prescription p WHERE p.prescriptionDate BETWEEN :startDate AND :endDate GROUP BY p.prescriptionDate ORDER BY p.prescriptionDate")
    List<Object[]> getDayWisePrescriptionCount(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    List<Prescription> findByPatientNameContainingIgnoreCase(String patientName);
}
