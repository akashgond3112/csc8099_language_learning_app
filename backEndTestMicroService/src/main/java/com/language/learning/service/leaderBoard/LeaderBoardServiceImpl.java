package com.language.learning.service.leaderBoard;

import com.language.learning.entity.LeaderBoard;
import com.language.learning.entity.UserProfile;
import com.language.learning.repository.LeaderBoardRepository;
import com.language.learning.repository.UserProfileRepository;
import com.language.learning.responses.leaderBoard.LeaderBoardResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 7/29/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Service
@Slf4j
public class LeaderBoardServiceImpl implements LeaderBoardService {

    @Autowired
    LeaderBoardRepository leaderBoardRepository;

    @Autowired
    UserProfileRepository userProfileRepository;

    /**
     * Retrieves the leaderboard data in descending order based on the scores.
     *
     * @return List of LeaderBoardResponse objects representing the leaderboard data.
     */
    @Override
    public List<LeaderBoardResponse> getLeaderBoard() {

        log.info("Getting the leader board data.");
        List<LeaderBoardResponse> leaderBoardResponses = new ArrayList<>();

        List<LeaderBoard> leaderBoards = leaderBoardRepository.findAllByOrderByScoreDesc();

        if (leaderBoards.isEmpty()) {
            log.info("There was no data found on the leader board table.");
            return leaderBoardResponses;
        }

        leaderBoards.forEach(leaderBoard -> {
            UserProfile userProfile = userProfileRepository.findByUserId(String.valueOf(leaderBoard.getUser().getId()));

            leaderBoardResponses.add(LeaderBoardResponse.builder()
                    .userId(leaderBoard.getUser().getId())
                    .score(leaderBoard.getScore())
                    .firstName(userProfile.getFirstName())
                    .lastName(userProfile.getLastName())
                    .location(userProfile.getLocation())
                    .updated_at(leaderBoard.getUpdated_at())
                    .build());
        });

        return leaderBoardResponses;
    }
}
