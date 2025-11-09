package com.main.utin.controller;
import com.main.utin.service.DrugInteractionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/drug-interaction")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Drug Interaction", description = "External API for drug interaction data")
public class DrugInteractionController {
    @Autowired
    private DrugInteractionService drugInteractionService;
    @GetMapping
    @Operation(summary = "Get drug interaction data", description = "Fetch drug interaction data from RxNav API")
    public ResponseEntity<Object> getDrugInteraction() {
        Object data = drugInteractionService.getDrugInteraction();
        return ResponseEntity.ok(data);
    }
}
