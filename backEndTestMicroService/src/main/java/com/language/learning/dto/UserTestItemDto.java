package com.language.learning.dto;

import javax.validation.constraints.NotEmpty;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public class UserTestItemDto {
    @NotEmpty(message = "userId should not be empty")
    private Long userId;

    @NotEmpty(message = "user test Id should not be empty")
    private Long userTestId;

    @NotEmpty(message = "user test Item Id should not be empty")
    private Long userTestItemId;
}
