package com.bookease.backend.service;

import com.bookease.backend.entity.TimeSlot;
import com.bookease.backend.repository.TimeSlotRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class TimeSlotService {

    private final TimeSlotRepository timeSlotRepository;

    public TimeSlotService(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    public TimeSlot createTimeSlot(TimeSlot timeSlot) {
        return timeSlotRepository.save(timeSlot);
    }

    public List<TimeSlot> getAllTimeSlots() {
        return timeSlotRepository.findAll();
    }

    public Optional<TimeSlot> getTimeSlotById(Long id) {
        return timeSlotRepository.findById(id);
    }

    public List<TimeSlot> getSlotsByDate(LocalDate date) {
        return timeSlotRepository.findBySlotDate(date);
    }

    public List<TimeSlot> getSlotsByServiceAndDate(
            Long serviceId,
            LocalDate date) {

        return timeSlotRepository
                .findByServiceIdAndSlotDate(serviceId, date);
    }

    public List<TimeSlot> getAvailableSlots(
            Long serviceId,
            LocalDate date) {

        return timeSlotRepository
                .findByServiceIdAndSlotDateAndAvailableTrue(
                        serviceId, date);
    }

    public TimeSlot updateTimeSlot(
            Long id,
            TimeSlot updatedTimeSlot) {

        TimeSlot existingTimeSlot = timeSlotRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Time slot not found"));

        existingTimeSlot.setSlotDate(updatedTimeSlot.getSlotDate());
        existingTimeSlot.setStartTime(updatedTimeSlot.getStartTime());
        existingTimeSlot.setEndTime(updatedTimeSlot.getEndTime());
        existingTimeSlot.setAvailable(updatedTimeSlot.getAvailable());

        return timeSlotRepository.save(existingTimeSlot);
    }

    public void deleteTimeSlot(Long id) {
        timeSlotRepository.deleteById(id);
    }
}