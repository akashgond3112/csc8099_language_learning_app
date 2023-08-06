package com.language.learning.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

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
public class UserTestItemDto {

    @NotEmpty(message = "user test Item Id should not be empty")
    private String userTestItemId;
    @NotEmpty(message = "user gained points should not be empty")
    private Long gainedPoints;
    @NotEmpty(message = "user isCorrect should not be empty")
    private Boolean isCorrect;
    private String answer;
}
