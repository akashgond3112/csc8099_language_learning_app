package com.language.learning.responses.userTest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.List;

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
public class UserTestResponse {

    private Long userId;
    private Long testId;
    private String status;
    private Long totalPoints;
    private Long gainedPoints;
    private Long totalQuestions;
    private Long questionAttempted;
    private String currentItem;
    private String testItems;
    private Long currentIndex;
    private List<UserTestItemResponse> userTestItemResponses;
    private LocalDateTime updated_at;
}
