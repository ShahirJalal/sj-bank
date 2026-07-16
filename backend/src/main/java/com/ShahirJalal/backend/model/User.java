package com.ShahirJalal.backend.model;

import jakarta.persistence.*;

import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "accountNumber", nullable = false)
    private String accountNumber;

    @Column(name = "initialBalance", nullable = false)
    private BigDecimal initialBalance;
}
