package com.riderlink.controller;

import com.riderlink.dto.CreateRideRequest;
import com.riderlink.dto.JoinRideRequest;
import com.riderlink.dto.RideResponse;
import com.riderlink.service.RideService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rides")
public class RideController {
    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RideResponse createRide(@Valid @RequestBody CreateRideRequest request) {
        return rideService.createRide(request);
    }

    @GetMapping("/{rideCode}")
    public RideResponse getRide(@PathVariable String rideCode) {
        return rideService.getRide(rideCode);
    }

    @PostMapping("/{rideCode}/join")
    public RideResponse joinRide(@PathVariable String rideCode, @Valid @RequestBody JoinRideRequest request) {
        return rideService.joinRide(rideCode, request.getUserId());
    }
}
