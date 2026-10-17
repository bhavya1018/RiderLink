package com.riderlink.dto;

import com.riderlink.model.Ride;
import com.riderlink.model.RideParticipant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class RideResponse {
    private final UUID id;
    private final String code;
    private final String name;
    private final String start;
    private final String destination;
    private final LocalDate date;
    private final LocalTime departureTime;
    private final int maxRiders;
    private final String creator;
    private final List<RideParticipantResponse> participants;
    private final LocalDateTime createdAt;

    public RideResponse(Ride ride) {
        this.id = ride.getId();
        this.code = ride.getCode();
        this.name = ride.getName();
        this.start = ride.getStart();
        this.destination = ride.getDestination();
        this.date = ride.getDate();
        this.departureTime = ride.getDepartureTime();
        this.maxRiders = ride.getMaxRiders();
        this.creator = ride.getCreator();
        this.createdAt = ride.getCreatedAt();
        this.participants = new ArrayList<RideParticipantResponse>();
        for (RideParticipant participant : ride.getParticipants()) {
            this.participants.add(new RideParticipantResponse(participant));
        }
    }

    public UUID getId() { return id; }
    public String getCode() { return code; }
    public String getName() { return name; }
    public String getStart() { return start; }
    public String getDestination() { return destination; }
    public LocalDate getDate() { return date; }
    public LocalTime getDepartureTime() { return departureTime; }
    public int getMaxRiders() { return maxRiders; }
    public String getCreator() { return creator; }
    public List<RideParticipantResponse> getParticipants() { return participants; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
