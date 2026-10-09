
package com.bookease.backend.controller;

import com.bookease.backend.dto.SlotGenerationRequest;
import com.bookease.backend.service.TimeSlotGenerationService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotGenerationController {

    private final TimeSlotGenerationService timeSlotGenerationService;

    public TimeSlotGenerationController(
            TimeSlotGenerationService timeSlotGenerationService) {
        this.timeSlotGenerationService = timeSlotGenerationService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateSlots(
            @Valid @RequestBody SlotGenerationRequest request) {

        int slotsCreated =
                timeSlotGenerationService.generateSlots(request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Time slots generated successfully");
        response.put("slotsCreated", slotsCreated);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/generate-all")
    public ResponseEntity<Map<String, Object>> generateAllSlots() {

        LocalDate startDate = LocalDate.of(2026, 10, 10);
        LocalDate endDate = LocalDate.of(2026, 12, 31);
        LocalTime startTime = LocalTime.of(12, 0);
        LocalTime endTime = LocalTime.of(22, 0);

        int slotsCreated =
                timeSlotGenerationService.generateSlotsForAllActiveServices(
                        startDate,
                        endDate,
                        startTime,
                        endTime
                );

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Slots generated for all active services");
        response.put("startDate", startDate);
        response.put("endDate", endDate);
        response.put("startTime", startTime);
        response.put("endTime", endTime);
        response.put("slotsCreated", slotsCreated);

        return ResponseEntity.ok(response);
    }
}
