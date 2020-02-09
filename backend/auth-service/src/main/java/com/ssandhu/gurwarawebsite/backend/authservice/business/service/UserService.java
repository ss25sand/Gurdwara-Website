package com.ssandhu.gurwarawebsite.backend.authservice.business.service;

import com.ssandhu.gurwarawebsite.backend.authservice.data.entity.User;
import com.ssandhu.gurwarawebsite.backend.authservice.data.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(String username) throws ResponseStatusException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        } else {
            return user;
        }
    }

    public User getUser(Long userId) throws ResponseStatusException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        } else {
            return user.get();
        }
    }

    public String getUserGroup(Long userId) throws ResponseStatusException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        } else {
            return user.get().getAuthGroup();
        }
    }

    public void setRefreshToken(User user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
    }



    public void create(String username, String passwordHash, String email) {
        User user = new User();
        user.setId(generateUserId());
        user.setUsername(username);
        user.setPassword(passwordHash);
        user.setEmail(email);
        userRepository.save(user);
    }

    public String delete() {
        return "";
    }

    private long generateUserId() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return random.nextLong();
    }
}
