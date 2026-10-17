package com.riderlink.service;

import com.riderlink.dto.CreateRideRequest;
import com.riderlink.dto.RideResponse;
import com.riderlink.exception.RideConflictException;
import com.riderlink.exception.RideNotFoundException;
import com.riderlink.model.Ride;
import com.riderlink.model.RideParticipant;
import com.riderlink.repository.RideRepository;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class RideService {
    private static final String CREATOR_ID = "demo-user";
    private static final String CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final RideRepository rideRepository;

    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    public synchronized RideResponse createRide(CreateRideRequest request) {
        String code = generateUniqueCode();
        Ride ride = new Ride(UUID.randomUUID(), code, request.getName().trim(), request.getStart().trim(),
                request.getDestination().trim(), request.getDate(), request.getDepartureTime(),
                request.getMaxRiders(), CREATOR_ID, LocalDateTime.now());
        ride.getParticipants().add(new RideParticipant(CREATOR_ID, LocalDateTime.now()));
        rideRepository.save(ride);
        return new RideResponse(ride);
    }

    public synchronized RideResponse getRide(String rideCode) {
        return new RideResponse(findRide(rideCode));
    }

    public synchronized RideResponse joinRide(String rideCode, String requestedUserId) {
        Ride ride = findRide(rideCode);
        String userId = requestedUserId.trim();
        for (RideParticipant participant : ride.getParticipants()) {
            if (participant.getUserId().trim().toLowerCase(Locale.ROOT)
                    .equals(userId.toLowerCase(Locale.ROOT))) {
                throw new RideConflictException("This user has already joined the ride.");
            }
        }
        if (ride.getParticipants().size() >= ride.getMaxRiders()) {
            throw new RideConflictException("This ride is full.");
        }
        ride.getParticipants().add(new RideParticipant(userId, LocalDateTime.now()));
        return new RideResponse(ride);
    }

    private Ride findRide(String rideCode) {
        String normalizedCode = rideCode.trim().toUpperCase(Locale.ROOT);
        Ride ride = rideRepository.findByCode(normalizedCode);
        if (ride == null) {
            throw new RideNotFoundException(normalizedCode);
        }
        return ride;
    }

    private String generateUniqueCode() {
        String code;
        do {
            StringBuilder value = new StringBuilder("RL-");
            for (int i = 0; i < 6; i++) {
                value.append(CODE_ALPHABET.charAt(RANDOM.nextInt(CODE_ALPHABET.length())));
            }
            code = value.toString();
        } while (rideRepository.containsCode(code));
        return code;
    }
}
