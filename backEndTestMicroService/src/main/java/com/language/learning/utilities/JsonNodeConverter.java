package com.language.learning.utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 22072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Converter
public class JsonNodeConverter implements AttributeConverter<JsonNode, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(JsonNode jsonNode) {
        try {
            return objectMapper.writeValueAsString(jsonNode);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON to String", e);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String jsonString) {
        try {
            return objectMapper.readTree(jsonString);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting String to JSON", e);
        }
    }
}
