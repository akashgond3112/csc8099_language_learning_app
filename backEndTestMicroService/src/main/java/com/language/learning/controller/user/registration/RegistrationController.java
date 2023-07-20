package com.language.learning.controller.user.registration;

import com.language.learning.dto.UserDto;
import com.language.learning.entity.User;
import com.language.learning.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 23042023
 * Copyright (C) 2023 Newcastle University, UK
 */
@RestController
@RequestMapping("/api/v1")
public class RegistrationController {

    @Autowired
    private UserService userService;

    /**
     * @param userDto expect and userDTO object to for the user registration
     * @return the AuthenticationResponse object
     */
    @PostMapping("/user/register")
    public ResponseEntity<?> registration(@RequestBody UserDto userDto) {
        User existingUser = userService.findUserByEmail(userDto.getEmail());

        if (existingUser == null) {
            return ResponseEntity.ok(userService.register(userDto));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is already registered!");


    }
}
