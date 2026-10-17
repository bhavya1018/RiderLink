package com.riderlink.model;

import java.time.LocalDateTime;

public class RideParticipant {
    private final String userId;
    private final LocalDateTime joinedAt;

    public RideParticipant(String userId, LocalDateTime joinedAt) {
        this.userId = userId;
        this.joinedAt = joinedAt;
    }

    public String getUserId() { return userId; }
    public LocalDateTime getJoinedAt() { return joinedAt; }
}
