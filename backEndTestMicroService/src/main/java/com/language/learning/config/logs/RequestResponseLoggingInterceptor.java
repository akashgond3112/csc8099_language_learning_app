package com.language.learning.config.logs;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 22072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Slf4j
@Component
public class RequestResponseLoggingInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(RequestResponseLoggingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Log additional request information
        logger.info("Request URI: {}", request.getRequestURI());
        logger.info("Request Method: {}", request.getMethod());
        logger.info("Request Headers: {}", request.getHeaderNames());
        logger.info("Request PathInfo: {}", request.getPathInfo());
        // You can log more information like request headers, parameters, etc.

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // Log additional response information
        logger.info("Response Status: {}", response.getStatus());
        // You can log more information like response headers, etc.
    }
}
