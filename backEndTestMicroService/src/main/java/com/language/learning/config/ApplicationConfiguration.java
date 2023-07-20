package com.language.learning.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 14march2023 Copyright (C) 2023 Newcastle University, UK
 */
@Configuration
public class ApplicationConfiguration {

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder){
		return restTemplateBuilder.build();
	}
}
