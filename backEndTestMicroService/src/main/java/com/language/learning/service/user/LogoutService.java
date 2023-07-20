package com.language.learning.service.user;

import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.entity.User;
import com.language.learning.entity.Token;
import com.language.learning.repository.TokenRepository;
import com.language.learning.utilities.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 23042023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    @Autowired
    UserService userService;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        User user = (User) userService.loadUserByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));
        final String jwt;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);

        List<Token> tokens = tokenRepository.findAllByUser(user);
        tokens.forEach(token -> {
            if (token.getToken().equals(jwt)) {
                token.setExpired(true);
                token.setRevoked(true);
                tokenRepository.save(token);
                SecurityContextHolder.clearContext();
            }
        });


    }
}
