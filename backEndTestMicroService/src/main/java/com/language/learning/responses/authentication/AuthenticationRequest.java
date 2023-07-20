package com.language.learning.responses.authentication;

import lombok.*;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 22042023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    private String username;
    private String password;
}