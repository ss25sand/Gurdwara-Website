package com.ssandhu.gurwarawebsite.backend.authservice.business.service;

import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.TokenPair;
import com.ssandhu.gurwarawebsite.backend.authservice.data.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SessionService {

    private final UserService userService;
    private final TokenService tokenService;

    public SessionService(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    public TokenPair create(String username, String password) throws ResponseStatusException {
        User user = userService.getUser(username);
        if (BCrypt.checkpw(password, user.getPassword())) {
            System.out.println("It matches");
            return tokenService.getTokenPair(username);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login failed");
        }
    }

    public void delete() {

    }
}
