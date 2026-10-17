package com.riderlink.repository;

import com.riderlink.model.Ride;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class RideRepository {
    private final Map<String, Ride> ridesByCode = new HashMap<String, Ride>();

    public synchronized boolean containsCode(String code) {
        return ridesByCode.containsKey(code);
    }

    public synchronized void save(Ride ride) {
        ridesByCode.put(ride.getCode(), ride);
    }

    public synchronized Ride findByCode(String code) {
        return ridesByCode.get(code);
    }
}
