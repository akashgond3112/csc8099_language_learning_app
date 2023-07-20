package com.language.learning.controller.user.auth;

import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.responses.authentication.AuthenticationRequest;
import com.language.learning.responses.authentication.AuthenticationResponse;
import com.language.learning.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 22042023
 * Copyright (C) 2023 Newcastle University, UK
 */

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserService userService;

    /**
     * @param authenticationRequest which include the username and password of the user
     * @return the generated token as AuthenticationResponse
     */
    @PostMapping("/auth/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity.ok(userService.login(authenticationRequest, authenticationManager));
    }

    /**
     * @param request  request include the current token of the user
     * @param response response as refresh token
     * @throws IOException if we cannot find the matching token
     */
    @PostMapping("auth/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        userService.refreshToken(request, response);
    }


}
