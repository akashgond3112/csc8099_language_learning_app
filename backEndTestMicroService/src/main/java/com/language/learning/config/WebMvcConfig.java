package com.language.learning.config;

import com.language.learning.config.logs.RequestResponseLoggingFilter;
import com.language.learning.config.logs.RequestResponseLoggingInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author akash.gond
 * @Project spring-boot-library
 * @Date 06062023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

/*    @Value("${external.react.frontend.app.url}")
    private String corsUrl;

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry){
        corsRegistry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins(corsUrl)
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(-1);
    }*/

    @Autowired
    private RequestResponseLoggingInterceptor requestResponseLoggingInterceptor;

    @Bean
    public FilterRegistrationBean<RequestResponseLoggingFilter> loggingFilter() {
        FilterRegistrationBean<RequestResponseLoggingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RequestResponseLoggingFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestResponseLoggingInterceptor).addPathPatterns("/**");
    }
}
