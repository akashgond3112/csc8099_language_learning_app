package com.language.learning.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.language.learning.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Entity
@Table(name = "usertestitem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserTestItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userId", nullable = false, updatable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userTestId", nullable = false, updatable = false)
    @JsonIgnore
    private UserTest userTest;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false, name = "totalPoints")
    private Long totalPoints;

    @Column(nullable = true, name = "gainedPoints")
    private Long gainedPoints;

    @Column(nullable = true, name = "answer")
    private String answer;

    @Column(nullable = false,updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    @Column(nullable = false,updatable = true)
    @UpdateTimestamp
    private LocalDateTime updated_at;

    @Column(nullable = false, name = "content")
    private String content;

}
