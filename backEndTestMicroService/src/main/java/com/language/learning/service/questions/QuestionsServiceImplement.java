package com.language.learning.service.questions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 14_July_2023 Copyright (C) 2023 Newcastle University, UK
 */

@Service
public class QuestionsServiceImplement implements QuestionsService {

    @Value("${external.content.api.url}")
    private String baseUrl;

    @Value("${external.content.api.questions}")
    private String urlPathQuestions;


    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Object getAllQuestions() {
        UriComponents build = null;
        build = UriComponentsBuilder.newInstance().scheme("http").host(baseUrl).path(urlPathQuestions).build();
        try {
            return restTemplate.getForObject(build.toUriString(), Object.class);
        } catch (Exception exception) {
            throw new RuntimeException("Not able to fetch the question, check if the service is running.");
        }
    }

}
