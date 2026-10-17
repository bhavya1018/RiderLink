package com.riderlink.exception;

public class RideNotFoundException extends RuntimeException {
    public RideNotFoundException(String code) {
        super("No ride found for code " + code + ".");
    }
}
