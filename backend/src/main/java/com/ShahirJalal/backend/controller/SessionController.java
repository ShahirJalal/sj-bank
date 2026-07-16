package com.ShahirJalal.backend.controller;

import com.ShahirJalal.backend.model.Session;
import com.ShahirJalal.backend.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Session> createSession(@RequestParam Long userId, @RequestParam String username, @RequestParam String password) {
        Session newSession = sessionService.createSession(userId, username, password);
        return new ResponseEntity<>(newSession, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions() {
        List<Session> sessions = sessionService.getAllSessions();
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> getSessionById(@PathVariable("id") Long id) {
        Optional<Session> session = sessionService.getSessionById(id);
        return session.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Session> getSessionByUserId(@PathVariable("userId") Long userId) {
        Optional<Session> session = sessionService.getSessionByUserId(userId);
        return session.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/token/{token}")
    public ResponseEntity<Session> getSessionByToken(@PathVariable("token") String token) {
        Optional<Session> session = sessionService.getSessionByToken(token);
        return session.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(@PathVariable("id") Long id, @RequestBody Session newSession) {
        Session updatedSession = sessionService.updateSession(id, newSession);
        return new ResponseEntity<>(updatedSession, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable("id") Long id) {
        sessionService.deleteSession(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PostMapping("/login")
//    public ResponseEntity<Session> login(@RequestBody Map<String, String> loginData) {
//        String username = loginData.get("username");
//        String password = loginData.get("password");
//        Optional<Session> session = sessionService.login(username, password);
//        return session.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
//                .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
//    }
}
