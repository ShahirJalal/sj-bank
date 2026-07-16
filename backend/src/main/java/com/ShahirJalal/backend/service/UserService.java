package com.ShahirJalal.backend.service;

import com.ShahirJalal.backend.model.User;
import com.ShahirJalal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByAccountNumber(String accountNumber) {
        return userRepository.findByAccountNumber(accountNumber);
    }

    public User updateUser(Long id, User newUser) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(newUser.getUsername());
            existingUser.setPassword(newUser.getPassword());
            existingUser.setRole(newUser.getRole());
            existingUser.setAccountNumber(newUser.getAccountNumber());
            existingUser.setInitialBalance(newUser.getInitialBalance());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }

        return Optional.empty();
    }
}