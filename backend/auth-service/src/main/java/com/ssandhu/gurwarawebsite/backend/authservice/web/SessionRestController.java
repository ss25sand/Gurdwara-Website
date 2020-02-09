package com.ssandhu.gurwarawebsite.backend.authservice.web;

import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.TokenPair;
import com.ssandhu.gurwarawebsite.backend.authservice.business.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/session")
public class SessionRestController {

    private final SessionService sessionService;

    @Autowired
    public SessionRestController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    public TokenPair login(
            @CookieValue("username") String username,
            @CookieValue("password") String password
    ) throws ResponseStatusException {
        return sessionService.create(username, password);
    }

    @DeleteMapping
    public void logout() {
        sessionService.delete();
    }
}
