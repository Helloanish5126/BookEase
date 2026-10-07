package com.bookease.backend.repository;

import com.bookease.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment> findByUserId(Long userId);

    List<Appointment> findByServiceId(Long serviceId);

    boolean existsByTimeSlotId(Long timeSlotId);
}