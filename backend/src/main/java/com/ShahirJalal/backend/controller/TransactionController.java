package com.ShahirJalal.backend.controller;

import com.ShahirJalal.backend.model.Transaction;
import com.ShahirJalal.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction newTransaction = transactionService.createTransaction(transaction);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionService.getTransactionById(id);
        return transaction != null ? new ResponseEntity<>(transaction, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Transaction>> getTransactionsByUsername(@PathVariable String username) {
        List<Transaction> transactions = transactionService.getTransactionsByUsername(username);
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
