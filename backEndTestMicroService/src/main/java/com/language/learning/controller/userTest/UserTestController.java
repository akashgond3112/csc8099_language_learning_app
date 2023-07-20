package com.language.learning.controller.userTest;

import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.entity.User;
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
    JwtTokenHelper jwtTokenHelper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    UserTestService userTestService;

    /**
     * @param userId expect an userId
     * @param testId expect an restaurantId
     * @return List<ReviewResponse></ReviewResponse>
     */
    @GetMapping("/user/test/{testId}")
    public ResponseEntity<?> getUserTest(HttpServletRequest request, @RequestParam(name = "userId", required = true) Long userId, @PathVariable int testId) {
        boolean b = testId == 0;
        if (b || (userId == null || userId == 0)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                Utilities.validateIsTokeExpired(jwtTokenHelper, request);
                Optional<User> user = userRepository.findById(userId);
                if (user.get() == null) { // check if we find the matching user details
                    throw new RuntimeException("Cannot find the matching user!!");
                }
                UserTestResponse userTestResponse = userTestService.getUserTest(user.get(), Long.valueOf(testId));
                return new ResponseEntity<>(userTestResponse, HttpStatus.OK);
            } catch (Exception exception) {
                System.out.println("Got an exception , either user was not valid or token was expired.");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        }
    }

}
