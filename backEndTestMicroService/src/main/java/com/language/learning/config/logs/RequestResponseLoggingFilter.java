package com.language.learning.config.logs;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
/**
 * @author agond
 * @Project spring-boot-library
 * @Date 22072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Component
public class RequestResponseLoggingFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(RequestResponseLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        // Log incoming request
        logger.info("Request: {} {}", httpServletRequest.getMethod(), httpServletRequest.getRequestURI());

        chain.doFilter(request, response);

        // Log outgoing response
        logger.info("Response Status: {}", httpServletResponse.getStatus());
    }
}
