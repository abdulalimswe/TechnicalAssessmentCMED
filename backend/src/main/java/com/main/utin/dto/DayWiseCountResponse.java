package com.main.utin.dto;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DayWiseCountResponse {
    private String day;
    private Long prescriptionCount;
}
