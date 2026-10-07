package com.bookease.backend.repository;

import com.bookease.backend.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    List<TimeSlot> findBySlotDate(LocalDate slotDate);

    List<TimeSlot> findByServiceIdAndSlotDate(Long serviceId, LocalDate slotDate);

    List<TimeSlot> findByServiceIdAndSlotDateAndAvailableTrue(
            Long serviceId,
            LocalDate slotDate
    );
}