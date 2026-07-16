package com.ShahirJalal.backend.service;

import com.ShahirJalal.backend.model.Session;
import com.ShahirJalal.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public Session createSession(Long userId, String username, String password) {
        String combinedCredentials = username + password;
        String token = generateToken(combinedCredentials);

        Session session = new Session();
        session.setUserId(userId);
        session.setLoginTime(LocalDateTime.now());
        session.setToken(token);

        return sessionRepository.save(session);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Optional<Session> getSessionById(Long id) {
        return sessionRepository.findById(id);
    }

    public Optional<Session> getSessionByUserId(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

    public Optional<Session> getSessionByToken(String token) {
        return sessionRepository.findByToken(token);
    }

    public Session updateSession(Long id, Session newSession) {
        Optional<Session> optionalSession = sessionRepository.findById(id);
        if (optionalSession.isPresent()) {
            Session existingSession = optionalSession.get();
            existingSession.setUserId(newSession.getUserId());
            existingSession.setLoginTime(newSession.getLoginTime());
            existingSession.setToken(newSession.getToken());
            return sessionRepository.save(existingSession);
        } else {
            throw new RuntimeException("Session not found with id: " + id);
        }
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }

    private String generateToken(String input) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[100];
        random.nextBytes(bytes);

        StringBuilder tokenBuilder = new StringBuilder();
        for (byte b : bytes) {
            char c = (char) ('!' + (Math.abs(b) % 94));
            tokenBuilder.append(c);
        }

        return tokenBuilder.toString();
    }
}
