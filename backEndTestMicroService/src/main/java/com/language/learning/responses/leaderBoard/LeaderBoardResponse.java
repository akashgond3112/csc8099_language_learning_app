package com.language.learning.responses.leaderBoard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 7/29/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaderBoardResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String location;
    private long score;
    private LocalDateTime updated_at;
}
