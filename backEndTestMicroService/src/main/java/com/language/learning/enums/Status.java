package com.language.learning.enums;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public enum Status {

    START("start"),
    IN_PROGRESS("inProgress"),
    COMPLETED("completed");

    private final String value;

    private Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
