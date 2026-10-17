package com.riderlink.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Ride {
    private final UUID id;
    private final String code;
    private final String name;
    private final String start;
    private final String destination;
    private final LocalDate date;
    private final LocalTime departureTime;
    private final int maxRiders;
    private final String creator;
    private final LocalDateTime createdAt;
    private final List<RideParticipant> participants = new ArrayList<RideParticipant>();

    public Ride(UUID id, String code, String name, String start, String destination, LocalDate date,
                LocalTime departureTime, int maxRiders, String creator, LocalDateTime createdAt) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.start = start;
        this.destination = destination;
        this.date = date;
        this.departureTime = departureTime;
        this.maxRiders = maxRiders;
        this.creator = creator;
        this.createdAt = createdAt;
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
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<RideParticipant> getParticipants() { return participants; }
}
