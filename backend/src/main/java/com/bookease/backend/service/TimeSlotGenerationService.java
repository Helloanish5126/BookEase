
package com.bookease.backend.service;

import com.bookease.backend.dto.SlotGenerationRequest;
import com.bookease.backend.entity.Service;
import com.bookease.backend.entity.TimeSlot;
import com.bookease.backend.repository.ServiceRepository;
import com.bookease.backend.repository.TimeSlotRepository;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@org.springframework.stereotype.Service
public class TimeSlotGenerationService {

    private final TimeSlotRepository timeSlotRepository;
    private final ServiceRepository serviceRepository;

    public TimeSlotGenerationService(
            TimeSlotRepository timeSlotRepository,
            ServiceRepository serviceRepository) {
        this.timeSlotRepository = timeSlotRepository;
        this.serviceRepository = serviceRepository;
    }

    @Transactional
    public int generateSlots(SlotGenerationRequest request) {

        Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() ->
                        new RuntimeException("Service not found"));

        if (!Boolean.TRUE.equals(service.getActive())) {
            throw new RuntimeException(
                    "Cannot generate slots for an inactive service");
        }

        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new RuntimeException(
                    "Start date cannot be after end date");
        }

        if (!request.getStartTime().isBefore(request.getEndTime())) {
            throw new RuntimeException(
                    "Start time must be before end time");
        }

        if (request.getSlotDurationMinutes() == null
                || request.getSlotDurationMinutes() <= 0) {
            throw new RuntimeException(
                    "Slot duration must be greater than 0");
        }

        return generateForService(
                service,
                request.getStartDate(),
                request.getEndDate(),
                request.getStartTime(),
                request.getEndTime(),
                request.getSlotDurationMinutes()
        );
    }

    @Transactional
    public int generateSlotsForAllActiveServices(
            LocalDate startDate,
            LocalDate endDate,
            LocalTime startTime,
            LocalTime endTime) {

        if (startDate.isAfter(endDate)) {
            throw new RuntimeException(
                    "Start date cannot be after end date");
        }

        if (!startTime.isBefore(endTime)) {
            throw new RuntimeException(
                    "Start time must be before end time");
        }

        List<Service> services = serviceRepository.findByActiveTrue();

        int totalSlotsCreated = 0;

        for (Service service : services) {
            totalSlotsCreated += generateForService(
                    service,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    service.getDuration()
            );
        }

        return totalSlotsCreated;
    }

    private int generateForService(
            Service service,
            LocalDate startDate,
            LocalDate endDate,
            LocalTime startTime,
            LocalTime endTime,
            int durationMinutes) {

        int slotsCreated = 0;
        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            LocalTime currentTime = startTime;

            while (currentTime.isBefore(endTime)) {
                LocalTime slotEndTime =
                        currentTime.plusMinutes(durationMinutes);

                if (slotEndTime.isAfter(endTime)) {
                    break;
                }

                boolean alreadyExists =
                        timeSlotRepository
                                .existsByServiceIdAndSlotDateAndStartTime(
                                        service.getId(),
                                        currentDate,
                                        currentTime
                                );

                if (!alreadyExists) {
                    TimeSlot timeSlot = new TimeSlot();
                    timeSlot.setService(service);
                    timeSlot.setSlotDate(currentDate);
                    timeSlot.setStartTime(currentTime);
                    timeSlot.setEndTime(slotEndTime);
                    timeSlot.setAvailable(true);

                    timeSlotRepository.save(timeSlot);
                    slotsCreated++;
                }

                currentTime = slotEndTime;
            }

            currentDate = currentDate.plusDays(1);
        }

        return slotsCreated;
    }
}
