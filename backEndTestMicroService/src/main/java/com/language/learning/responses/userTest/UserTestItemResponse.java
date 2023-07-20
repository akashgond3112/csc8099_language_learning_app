package com.language.learning.responses.userTest;

import java.time.LocalDateTime;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public class UserTestItemResponse {

    private Long userId;
    private Long testId;
    private String status;
    private String content;
    private Long totalPoints;
    private Long gainedPoints;
    private String answer;
    private LocalDateTime updated_at;
}
