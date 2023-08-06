package com.language.learning.controller.leaderBoard;

import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.entity.User;
import com.language.learning.repository.UserRepository;
import com.language.learning.responses.leaderBoard.LeaderBoardResponse;
import com.language.learning.service.leaderBoard.LeaderBoardService;
import com.language.learning.utilities.Utilities;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 7/29/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */
@RestController
@RequestMapping("/api/v1")
public class LeaderBoardController {

    @Autowired
    LeaderBoardService leaderBoardService;
    @Autowired
    JwtTokenHelper jwtTokenHelper;
    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves the leaderboard data for the user.
     *
     * @param request The HttpServletRequest containing the user's JWT token.
     * @return ResponseEntity containing the leaderBoardResponse or an error message if there is an issue.
     */
    @GetMapping("/user/leaderBoard")
    public ResponseEntity<?> getUserTest(HttpServletRequest request) {
        ResponseEntity<Object> objectResponseEntity = Utilities.validateIsTokeExpired(jwtTokenHelper, request);
        if (objectResponseEntity != null) {
            return objectResponseEntity;
        }

        User user = userRepository.findByUsername(Utilities.getCurrentUser(jwtTokenHelper, request));

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                List<LeaderBoardResponse> leaderBoardResponse = leaderBoardService.getLeaderBoard();
                return new ResponseEntity<>(leaderBoardResponse, HttpStatus.OK);
            } catch (Exception exception) {
                System.out.println("Got an exception , either user was not valid or token was expired.");
                return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }
    }
}
