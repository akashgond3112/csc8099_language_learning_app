package com.language.learning.responses.user;

import com.language.learning.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 26042023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private long userId;
    private String userName;
    private String email;
    private String mobileNumber;
    private Gender gender;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String nativeLanguage;
    private String nativeLanguageImageUrl;
    private String targetLanguage;
    private String targetLanguageImageUrl;
}
