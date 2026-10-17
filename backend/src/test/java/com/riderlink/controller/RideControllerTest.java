package com.riderlink.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RideControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createsRideWithGeneratedCodeAndCreator() throws Exception {
        MvcResult result = createRideResult(2).andExpect(status().isCreated())
                .andExpect(jsonPath("$.code").exists())
                .andExpect(jsonPath("$.creator").value("demo-user"))
                .andExpect(jsonPath("$.participants.length()").value(1))
                .andReturn();
        JsonNode ride = objectMapper.readTree(result.getResponse().getContentAsString());
        assertTrue(ride.get("id").isTextual());
        assertTrue(ride.get("code").asText().matches("RL-[A-Z0-9]{6}"));
    }

    @Test
    public void retrievesRideByNormalizedCode() throws Exception {
        String code = createRide(2);
        mockMvc.perform(get("/api/rides/{code}", "  " + code.toLowerCase() + "  "))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(code));
    }

    @Test
    public void joinsRideWithValidCode() throws Exception {
        String code = createRide(2);
        mockMvc.perform(post("/api/rides/{code}/join", code.toLowerCase())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(joinRequest("rider-1")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.participants.length()").value(2))
                .andExpect(jsonPath("$.participants[1].userId").value("rider-1"));
    }

    @Test
    public void rejectsUnknownRideCode() throws Exception {
        mockMvc.perform(get("/api/rides/{code}", "RL-UNKNOWN"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    public void rejectsDuplicateJoining() throws Exception {
        String code = createRide(3);
        mockMvc.perform(post("/api/rides/{code}/join", code)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(joinRequest(" DEMO-USER ")))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("This user has already joined the ride."));
    }

    @Test
    public void rejectsJoiningWhenRideIsFull() throws Exception {
        String code = createRide(2);
        mockMvc.perform(post("/api/rides/{code}/join", code)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(joinRequest("rider-1")))
                .andExpect(status().isOk());
        mockMvc.perform(post("/api/rides/{code}/join", code)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(joinRequest("rider-2")))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("This ride is full."));
    }

    @Test
    public void rejectsInvalidRideCreationRequests() throws Exception {
        Map<String, Object> request = new HashMap<String, Object>();
        request.put("name", "  ");
        request.put("start", "Origin");
        request.put("destination", "Destination");
        request.put("date", LocalDate.now().plusDays(1).toString());
        request.put("departureTime", "09:30");
        request.put("maxRiders", 1);
        mockMvc.perform(post("/api/rides")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    public void healthCheckReportsBackendStatus() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }

    private String createRide(int maxRiders) throws Exception {
        MvcResult result = createRideResult(maxRiders).andReturn();
        assertEquals(201, result.getResponse().getStatus());
        JsonNode ride = objectMapper.readTree(result.getResponse().getContentAsString());
        return ride.get("code").asText();
    }

    private org.springframework.test.web.servlet.ResultActions createRideResult(int maxRiders) throws Exception {
        Map<String, Object> request = new HashMap<String, Object>();
        request.put("name", "Weekend ride");
        request.put("start", "North lot");
        request.put("destination", "Coast");
        request.put("date", LocalDate.now().plusDays(1).toString());
        request.put("departureTime", "09:30");
        request.put("maxRiders", maxRiders);
        return mockMvc.perform(post("/api/rides")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));
    }

    private String joinRequest(String userId) throws Exception {
        Map<String, String> request = new HashMap<String, String>();
        request.put("userId", userId);
        return objectMapper.writeValueAsString(request);
    }

}
