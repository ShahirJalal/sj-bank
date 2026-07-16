package com.ShahirJalal.backend.repository;

import com.ShahirJalal.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderOrRecipient(String sender, String recipient);
}
