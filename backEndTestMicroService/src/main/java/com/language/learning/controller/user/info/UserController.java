package com.language.learning.controller.user.info;

import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.dto.UserDto;
import com.language.learning.entity.User;
import com.language.learning.service.user.UserService;
import com.language.learning.utilities.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 23042023
 * Copyright (C) 2023 Newcastle University, UK
 */
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    /**
     * @param request request include the request having the token
     * @return the userDto object having the user details
     */
    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {

        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }
        User user = (User) userService.loadUserByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));
        if (user.getId() != null) {
            return new ResponseEntity<>(userService.getUserInfo(user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/user/profile")
    public ResponseEntity<?> updateProfile(HttpServletRequest request, @RequestBody UserDto userDto){
        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }
        User user = (User) userService.loadUserByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));
        if (user.getId() != null) {
            return new ResponseEntity<>(userService.updateProfile(user, userDto), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
