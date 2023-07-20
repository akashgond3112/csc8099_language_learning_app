package com.language.learning.exception;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 16042023
 * Copyright (C) 2023 Newcastle University, UK
 */
public class TokeExpiredException extends RuntimeException {
    public TokeExpiredException(String message) {
        super(message);
    }
}

