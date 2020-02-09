package com.ssandhu.gurwarawebsite.backend.authservice.business.service;

import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.AccessToken;
import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.RefreshToken;
import com.ssandhu.gurwarawebsite.backend.authservice.business.domain.TokenPair;
import com.ssandhu.gurwarawebsite.backend.authservice.data.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

@Service
public class TokenService {

    static final long ONE_MINUTE_IN_MILLIS = 60000; // millisecs
    private final UserService userService;

    @Autowired
    public TokenService(UserService userService) {
        this.userService = userService;
    }

    public TokenPair getTokenPair(String username) {
        AccessToken access = generateAccessToken(username);
        RefreshToken refresh = generateRefreshToken();
        return new TokenPair(access, refresh);
    }

    private AccessToken generateAccessToken(Long userId, String refreshToken) {
        User user = userService.getUser(userId);
        String userGroup = userService.getUserGroup(userId);
        if (user.getRefreshToken().equals(refreshToken)) {
            return new AccessToken(generateJWT(userId, userGroup));
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
        }
    }

    private AccessToken generateAccessToken(String username) {
        Long userId = userService.getUser(username).getId();
        String userGroup = userService.getUserGroup(userId);
        return new AccessToken(generateJWT(userId, userGroup));
    }

    private RefreshToken generateRefreshToken() {
        SecureRandom random = new SecureRandom();
        String source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < 32; i++) {
            builder.append(source.charAt(random.nextInt(source.length())));
        }
        return new RefreshToken(builder.toString());
    }

    private String generateJWT(Long userId, String authUserGroup) {
        long now = Calendar.getInstance().getTimeInMillis();
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[32];
        random.nextBytes(bytes);
        System.out.println(bytes);
        System.out.println(random);
        return Jwts.builder()
//            .setIssuer("Stormpath")
//            .setSubject("msilverman")
            .claim("userId", userId)
            .claim("userGroup", authUserGroup)
            .setIssuedAt(new Date())
            .setExpiration(new Date(now + (10 * ONE_MINUTE_IN_MILLIS)))
            .signWith(SignatureAlgorithm.HS256, bytes)
            .compact();
    }
}