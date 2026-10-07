package com.bookease.backend.service;

import org.springframework.transaction.annotation.Transactional;
import com.bookease.backend.entity.Appointment;
import com.bookease.backend.entity.Service;
import com.bookease.backend.entity.TimeSlot;
import com.bookease.backend.entity.User;
import com.bookease.backend.repository.AppointmentRepository;
import com.bookease.backend.repository.ServiceRepository;
import com.bookease.backend.repository.TimeSlotRepository;
import com.bookease.backend.repository.UserRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            TimeSlotRepository timeSlotRepository,
            UserRepository userRepository,
            ServiceRepository serviceRepository) {

        this.appointmentRepository = appointmentRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }

    @Transactional
    public Appointment createAppointment(Appointment appointment) {

        // Check user
        if (appointment.getUser() == null
                || appointment.getUser().getId() == null) {

            throw new RuntimeException("User is required");
        }

        User existingUser = userRepository
                .findById(appointment.getUser().getId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Check service
        if (appointment.getService() == null
                || appointment.getService().getId() == null) {

            throw new RuntimeException("Service is required");
        }

        Service existingService = serviceRepository
                .findById(appointment.getService().getId())
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

        // Check time slot
        if (appointment.getTimeSlot() == null
                || appointment.getTimeSlot().getId() == null) {

            throw new RuntimeException("Time slot is required");
        }

        TimeSlot existingSlot = timeSlotRepository
                .findById(appointment.getTimeSlot().getId())
                .orElseThrow(() ->
                        new RuntimeException("Time slot not found"));

        // Check availability
        if (!existingSlot.getAvailable()) {

            throw new RuntimeException(
                    "This time slot is not available");
        }

        // Check double booking
        if (appointmentRepository
                .existsByTimeSlotId(existingSlot.getId())) {

            throw new RuntimeException(
                    "This time slot is already booked");
        }

        // Mark slot as unavailable
        existingSlot.setAvailable(false);
        timeSlotRepository.save(existingSlot);

        // Use actual database entities
        appointment.setUser(existingUser);
        appointment.setService(existingService);
        appointment.setTimeSlot(existingSlot);

        // New appointments start as PENDING
        appointment.setStatus("PENDING");

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByUser(Long userId) {

        return appointmentRepository.findByUserId(userId);
    }

    public List<Appointment> getAppointmentsByService(Long serviceId) {

        return appointmentRepository.findByServiceId(serviceId);
    }

    public Appointment getAppointmentById(Long id) {

        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointmentStatus(
            Long id,
            String status) {

        Appointment appointment = getAppointmentById(id);

        appointment.setStatus(status);

        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id) {

        Appointment appointment = getAppointmentById(id);

        appointment.setStatus("CANCELLED");

        TimeSlot timeSlot = appointment.getTimeSlot();

        if (timeSlot != null) {

            timeSlot.setAvailable(true);
            timeSlotRepository.save(timeSlot);
        }

        appointmentRepository.save(appointment);
    }
}