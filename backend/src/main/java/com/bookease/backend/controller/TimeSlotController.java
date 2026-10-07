package com.bookease.backend.controller;

import com.bookease.backend.entity.TimeSlot;
import com.bookease.backend.service.TimeSlotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/time-slots")
public class TimeSlotController {

    private final TimeSlotService timeSlotService;

    public TimeSlotController(TimeSlotService timeSlotService) {
        this.timeSlotService = timeSlotService;
    }

    // Create a new time slot
    @PostMapping
    public ResponseEntity<TimeSlot> createTimeSlot(
            @RequestBody TimeSlot timeSlot) {

        return ResponseEntity.ok(
                timeSlotService.createTimeSlot(timeSlot)
        );
    }

    // Get all time slots
    @GetMapping
    public ResponseEntity<List<TimeSlot>> getAllTimeSlots() {

        return ResponseEntity.ok(
                timeSlotService.getAllTimeSlots()
        );
    }

    // Get time slot by ID
    @GetMapping("/{id}")
    public ResponseEntity<TimeSlot> getTimeSlotById(
            @PathVariable Long id) {

        return timeSlotService.getTimeSlotById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get slots by date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<TimeSlot>> getSlotsByDate(
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                timeSlotService.getSlotsByDate(date)
        );
    }

    // Get slots for a service on a specific date
    @GetMapping("/service/{serviceId}/date/{date}")
    public ResponseEntity<List<TimeSlot>> getSlotsByServiceAndDate(
            @PathVariable Long serviceId,
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                timeSlotService.getSlotsByServiceAndDate(
                        serviceId, date
                )
        );
    }

    // Get available slots for a service on a specific date
    @GetMapping("/available/{serviceId}/{date}")
    public ResponseEntity<List<TimeSlot>> getAvailableSlots(
            @PathVariable Long serviceId,
            @PathVariable LocalDate date) {

        return ResponseEntity.ok(
                timeSlotService.getAvailableSlots(
                        serviceId, date
                )
        );
    }

    // Update time slot
    @PutMapping("/{id}")
    public ResponseEntity<TimeSlot> updateTimeSlot(
            @PathVariable Long id,
            @RequestBody TimeSlot timeSlot) {

        return ResponseEntity.ok(
                timeSlotService.updateTimeSlot(id, timeSlot)
        );
    }

    // Delete time slot
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTimeSlot(
            @PathVariable Long id) {

        timeSlotService.deleteTimeSlot(id);

        return ResponseEntity.ok(
                "Time slot deleted successfully"
        );
    }
}