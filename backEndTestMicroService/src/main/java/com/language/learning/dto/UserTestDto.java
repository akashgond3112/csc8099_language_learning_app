package com.language.learning.dto;

import com.language.learning.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserTestDto {
    private Status status;
    private Long totalPoints;
    private Long gainedPoints;
    private Long totalQuestions;
    private Long questionAttempted;
    private String currentItem;
    private String testItems;
    private Long currentIndex;
}
