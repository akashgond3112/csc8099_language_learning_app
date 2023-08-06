package com.language.learning.service.leaderBoard;

import com.language.learning.responses.leaderBoard.LeaderBoardResponse;

import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 7/29/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */
public interface LeaderBoardService {

    List<LeaderBoardResponse> getLeaderBoard();
}
