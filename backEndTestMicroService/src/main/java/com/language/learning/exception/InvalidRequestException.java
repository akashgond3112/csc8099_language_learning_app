package com.language.learning.exception;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 16042023
 * Copyright (C) 2023 Newcastle University, UK
 */
public class InvalidRequestException extends RuntimeException {
    public InvalidRequestException(String message) {
        super(message);
    }
}

