package com.language.learning.dto;

import com.language.learning.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 22042023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @NotEmpty(message = "First Name should not be empty")
    private String firstName;
    @NotEmpty(message = "Last Name should not be empty")
    private String lastName;
    @NotEmpty
    @Size(min = 10, message = "Location should be at least 10 number long")
    private String location;
    @NotEmpty
    @Size(min = 10, message = "Password should be at least 10 number long")
    private String mobileNumber;
    @NotEmpty
    private Gender gender;
    @NotEmpty(message = "Email should not be empty")
    private String email;
    @NotEmpty(message = "Password should not be empty")
    private String password;

//    PATCH REQUEST
    private String targetLanguage;
    private String nativeLanguage;



}
