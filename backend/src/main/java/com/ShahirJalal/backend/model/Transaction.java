package com.ShahirJalal.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender", nullable = false)
    private String sender;

    @Column(name = "recipient", nullable = false)
    private String recipient;

    @Column(name = "senderAccountNumber", nullable = false)
    private String senderAccountNumber;

    @Column(name = "recipientAccountNumber", nullable = false)
    private String recipientAccountNumber;

    @Column(name = "reference", nullable = false)
    private String reference;

    @Column(name = "transactionType", nullable = false)
    private String transactionType;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
}
