package com.bookease.backend.controller;

import com.bookease.backend.entity.Service;
import com.bookease.backend.service.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // Create a new service
    @PostMapping
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        return ResponseEntity.ok(serviceService.createService(service));
    }

    // Get all services
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    // Get only active services
    @GetMapping("/active")
    public ResponseEntity<List<Service>> getActiveServices() {
        return ResponseEntity.ok(serviceService.getActiveServices());
    }

    // Get service by ID
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update service
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @RequestBody Service service) {

        return ResponseEntity.ok(
                serviceService.updateService(id, service)
        );
    }

    // Delete service
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {

        serviceService.deleteService(id);

        return ResponseEntity.ok("Service deleted successfully");
    }
}