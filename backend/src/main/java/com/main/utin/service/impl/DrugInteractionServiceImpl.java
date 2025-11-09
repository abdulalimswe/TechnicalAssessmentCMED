package com.main.utin.service.impl;

import com.main.utin.service.DrugInteractionService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DrugInteractionServiceImpl implements DrugInteractionService {
    
    private final RestTemplate restTemplate;
    private static final String API_URL = "https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248";

    public DrugInteractionServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Object getDrugInteraction() {
        try {
            return restTemplate.getForObject(API_URL, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch drug interaction data: " + e.getMessage());
        }
    }
}

