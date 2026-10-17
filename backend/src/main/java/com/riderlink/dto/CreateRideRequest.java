package com.riderlink.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateRideRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String start;
    @NotBlank
    private String destination;
    @NotNull
    @FutureOrPresent
    private LocalDate date;
    @NotNull
    private LocalTime departureTime;
    @Min(2)
    private int maxRiders;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getStart() { return start; }
    public void setStart(String start) { this.start = start; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalTime departureTime) { this.departureTime = departureTime; }
    public int getMaxRiders() { return maxRiders; }
    public void setMaxRiders(int maxRiders) { this.maxRiders = maxRiders; }
}
