package com.language.learning.exception;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 22072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public class UserTestException extends RuntimeException{

    public UserTestException(String message) {
        super(message);
    }
}
