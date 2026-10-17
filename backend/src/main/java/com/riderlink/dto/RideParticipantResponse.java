package com.riderlink.dto;

import com.riderlink.model.RideParticipant;
import java.time.LocalDateTime;

public class RideParticipantResponse {
    private final String userId;
    private final LocalDateTime joinedAt;

    public RideParticipantResponse(RideParticipant participant) {
        this.userId = participant.getUserId();
        this.joinedAt = participant.getJoinedAt();
    }

    public String getUserId() { return userId; }
    public LocalDateTime getJoinedAt() { return joinedAt; }
}
