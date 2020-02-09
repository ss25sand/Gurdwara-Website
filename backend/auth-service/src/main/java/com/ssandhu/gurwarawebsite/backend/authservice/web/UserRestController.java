package com.ssandhu.gurwarawebsite.backend.authservice.web;

import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.AccessToken;
import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.TokenPair;
import com.ssandhu.gurwarawebsite.backend.authservice.business.service.TokenService;
import com.ssandhu.gurwarawebsite.backend.authservice.business.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserRestController {

    private final UserService userService;
    private final TokenService tokenService;

    @Autowired
    public UserRestController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @CrossOrigin(origins = "http://localhost:4001")
    @PostMapping
    public TokenPair create(
        @CookieValue("username") String username,
        @CookieValue("password") String password,
        @CookieValue("email") String email
    ) {
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
        userService.create(username, passwordHash, email);
        return tokenService.getTokenPair(username);
    }

    @DeleteMapping
    public String delete() {
        return "";
    }
}
