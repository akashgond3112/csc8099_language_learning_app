package com.language.learning.controller.userTest;

import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.dto.UserTestDto;
import com.language.learning.entity.User;
import com.language.learning.enums.Status;
import com.language.learning.repository.UserRepository;
import com.language.learning.responses.userTest.UserTestResponse;
import com.language.learning.service.user.UserService;
import com.language.learning.service.userTest.UserTestService;
import com.language.learning.utilities.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17092023
 * Copyright (C) 2023 Newcastle University, UK
 */

@RestController
@RequestMapping("/api/v1")
public class UserTestController {

    @Autowired
    UserService userService;
    @Autowired
    UserTestService userTestService;
    @Autowired
    JwtTokenHelper jwtTokenHelper;
    @Autowired
    private UserRepository userRepository;

    /**
     * @return UserTestResponse
     */
    @PostMapping("/user/test")
    public ResponseEntity<?> createUserTest(HttpServletRequest request) {

        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }

        User user = userRepository.findByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                UserTestResponse userTestResponse = userTestService.createUserTest(user);
                return new ResponseEntity<>(userTestResponse, HttpStatus.OK);
            } catch (Exception exception) {
                System.out.println("Got an exception , either user was not valid or token was expired.");
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }
    }

    /**
     * @return UserTestResponse
     */
    @PatchMapping("/user/test/{userTestId}")
    public ResponseEntity<?> updateUserTest(HttpServletRequest request, @PathVariable String userTestId, @RequestBody UserTestDto userTestDto) {

        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }

        User user = userRepository.findByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));

        if (user == null || userTestId == null) {
            return new ResponseEntity<>("User test Id not present in path variable.", HttpStatus.BAD_REQUEST);
        } else {
            try {
                UserTestResponse userTestResponse = userTestService.updateUserTest(user, userTestDto, Long.valueOf(userTestId));
                return new ResponseEntity<>(userTestResponse, HttpStatus.OK);
            } catch (Exception exception) {
                System.out.println("Got an exception , either user was not valid or token was expired.");
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }
    }

    /**
     * @param userTestId expect a userTestId
     * @return the user test response
     */
    @GetMapping("/user/test/{userTestId}")
    public ResponseEntity<?> getUserTest(HttpServletRequest request, @PathVariable("userTestId") int userTestId) {
        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }

        User user = userRepository.findByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                UserTestResponse userTestResponse = userTestService.getUserTest(user, (long) userTestId);
                return new ResponseEntity<>(userTestResponse, HttpStatus.OK);
            } catch (Exception exception) {
                System.out.println("Got an exception , either user was not valid or token was expired.");
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }
    }

    /**
     * @param status expect a status which can be either start/in-progress/completed
     * @return the user test response
     */
    @GetMapping("/user/tests")
    public ResponseEntity<?> getAllUserTest(HttpServletRequest request, @RequestParam(name = "status", required = false) Status status) {
        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }

        User user = userRepository.findByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                List<UserTestResponse> userTestResponse = userTestService.getAllUserTest(user, status);
                return new ResponseEntity<>(userTestResponse, HttpStatus.OK);
            } catch (Exception exception) {
                System.out.println("Got an exception , either user was not valid or token was expired.");
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }
    }

}
