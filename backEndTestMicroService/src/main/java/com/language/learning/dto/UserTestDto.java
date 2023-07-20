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
public class UserTestDto {
    @NotEmpty(message = "userId should not be empty")
    private Long userId;

    @NotEmpty(message = "user test Id should not be empty")
    private Long userTestId;
}
