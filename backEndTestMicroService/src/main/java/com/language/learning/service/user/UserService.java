package com.language.learning.service.user;

import com.language.learning.dto.UserDto;
import com.language.learning.entity.User;
import com.language.learning.responses.authentication.AuthenticationRequest;
import com.language.learning.responses.authentication.AuthenticationResponse;
import com.language.learning.responses.user.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 22042023
 * Copyright (C) 2023 Newcastle University, UK
 */
public interface UserService {

    AuthenticationResponse register(UserDto userDto);
    AuthenticationResponse login(AuthenticationRequest request, AuthenticationManager authenticationManager);
    UserResponse getUserInfo(User user);

    UserResponse updateProfile(User user, UserDto userDto);

    User findUserByEmail(String email);

    List<User> findAllUsers();

    User findByUsername(String username);

    UserDetails loadUserByUsername(String username);

    void refreshToken(HttpServletRequest request,
                      HttpServletResponse response);


}
