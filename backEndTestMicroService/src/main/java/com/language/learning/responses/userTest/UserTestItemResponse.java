package com.language.learning.responses.userTest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTestItemResponse {

    private Long userId;
    private Long testId;
    private String testItemId;
    private String status;
    private Long totalPoints;
    private Long gainedPoints;
    private String answer;
    private String content;
    private String difficultyLevel;
    private String bloomsLevel;
    private String type;
    private Boolean isCorrect;
    private LocalDateTime updated_at;
}
