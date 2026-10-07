package com.bookease.backend.service;

import com.bookease.backend.entity.Service;
import com.bookease.backend.repository.ServiceRepository;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<Service> getActiveServices() {
        return serviceRepository.findByActiveTrue();
    }

    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public Service updateService(Long id, Service updatedService) {

        Service existingService = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));

        existingService.setName(updatedService.getName());
        existingService.setDescription(updatedService.getDescription());
        existingService.setPrice(updatedService.getPrice());
        existingService.setDuration(updatedService.getDuration());
        existingService.setImageUrl(updatedService.getImageUrl());
        existingService.setActive(updatedService.getActive());

        return serviceRepository.save(existingService);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}