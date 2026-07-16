package com.ShahirJalal.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "session")
@Data
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId", nullable = false, unique = true)
    private Long userId;

    @Column(name = "loginTime", nullable = false)
    private LocalDateTime loginTime;

    @Column(name = "token", nullable = false, length = 100, unique = true)
    private String token;
}