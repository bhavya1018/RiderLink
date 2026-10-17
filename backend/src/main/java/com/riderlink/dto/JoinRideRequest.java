package com.riderlink.dto;

import javax.validation.constraints.NotBlank;

public class JoinRideRequest {
    @NotBlank
    private String userId;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
