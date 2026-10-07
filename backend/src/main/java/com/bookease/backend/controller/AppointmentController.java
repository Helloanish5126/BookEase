package com.bookease.backend.controller;

import com.bookease.backend.entity.Appointment;
import com.bookease.backend.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService = appointmentService;
    }

    // Create a new appointment
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(
            @RequestBody Appointment appointment) {

        return ResponseEntity.ok(
                appointmentService.createAppointment(appointment)
        );
    }

    // Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService.getAllAppointments()
        );
    }

    // Get appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                appointmentService.getAppointmentById(id)
        );
    }

    // Get appointments of a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                appointmentService.getAppointmentsByUser(userId)
        );
    }

    // Get appointments for a service
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByService(
            @PathVariable Long serviceId) {

        return ResponseEntity.ok(
                appointmentService.getAppointmentsByService(serviceId)
        );
    }

    // Update appointment status
    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                appointmentService.updateAppointmentStatus(
                        id, status
                )
        );
    }

    // Cancel appointment
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelAppointment(
            @PathVariable Long id) {

        appointmentService.cancelAppointment(id);

        return ResponseEntity.ok(
                "Appointment cancelled successfully"
        );
    }
}