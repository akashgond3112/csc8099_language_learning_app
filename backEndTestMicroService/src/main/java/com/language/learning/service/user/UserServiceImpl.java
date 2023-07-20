package com.language.learning.service.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.language.learning.config.auth.JwtTokenHelper;
import com.language.learning.dto.UserDto;
import com.language.learning.entity.Token;
import com.language.learning.entity.User;
import com.language.learning.entity.UserProfile;
import com.language.learning.enums.Role;
import com.language.learning.enums.TokenType;
import com.language.learning.repository.TokenRepository;
import com.language.learning.repository.UserProfileRepository;
import com.language.learning.repository.UserRepository;
import com.language.learning.responses.authentication.AuthenticationRequest;
import com.language.learning.responses.authentication.AuthenticationResponse;
import com.language.learning.responses.user.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 22042023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Override
    public AuthenticationResponse register(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getEmail());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.USER);
        user.setGender(userDto.getGender());
        userRepository.save(user);

        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);
        userProfile.setFirstName(userDto.getFirstName());
        userProfile.setLastName(userDto.getLastName());
        userProfile.setLocation(userDto.getLocation());
        //TODO : Implement in later stage to upload the image
        userProfile.setImageUrl("https://i.pinimg.com/564x/56/c7/5d/56c75d13636b5830b34385f6df90ca43.jpg");
        userProfileRepository.save(userProfile);

        String jwtToken = jwtTokenHelper.generateToken(user.getUsername());
        String refreshToken = jwtTokenHelper.generateRefreshToken(user.getUsername());

        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request, AuthenticationManager authenticationManager) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername());
        var jwtToken = jwtTokenHelper.generateToken(user.getUsername());
        var refreshToken = jwtTokenHelper.generateRefreshToken(user.getUsername());
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public UserResponse getUserInfo(User user) {

        if (user != null) {
            UserProfile userProfile = userProfileRepository.findByUserId(String.valueOf(user.getId()));
            return UserResponse.builder()
                    .userId(user.getId())
                    .userName(user.getUsername())
                    .email(user.getEmail())
                    .gender(user.getGender())
                    .mobileNumber(user.getMobileNumber())
                    .firstName(userProfile.getFirstName())
                    .lastName(userProfile.getLastName())
                    .targetLanguage(userProfile.getTargetLanguage())
                    .nativeLanguage(userProfile.getNativeLanguage())
                    .imageUrl(userProfile.getImageUrl())
                    .build();
        } else {
            throw new RuntimeException("user cannot be null");
        }
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll().stream().toList();
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        String username = jwtTokenHelper.getUsernameFromToken(refreshToken);
        if (username != null) {
            User user = userRepository.findByUsername(username);

            if (jwtTokenHelper.validateToken(refreshToken, user)) {
                var accessToken = jwtTokenHelper.generateToken(user.getUsername());
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                try {
                    new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}
