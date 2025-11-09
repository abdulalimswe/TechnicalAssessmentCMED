package com.main.utin.service;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class DrugInteractionService {
    private final RestTemplate restTemplate;
    private static final String API_URL = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248";
    public DrugInteractionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public Object getDrugInteraction() {
        try {
            return restTemplate.getForObject(API_URL, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch drug interaction data: " + e.getMessage());
        }
    }
}
