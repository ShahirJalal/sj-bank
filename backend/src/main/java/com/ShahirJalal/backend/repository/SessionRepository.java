package com.ShahirJalal.backend.repository;

import com.ShahirJalal.backend.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {

    Optional<Session> findByUserId(Long userId);
    Optional<Session> findByToken(String token);
}