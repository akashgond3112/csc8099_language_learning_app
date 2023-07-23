package com.language.learning.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;
import com.language.learning.enums.Status;
import com.language.learning.utilities.JsonNodeConverter;
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
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_test_id", nullable = false, updatable = false)
    @JsonIgnore
    private UserTest userTest;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false, name = "total_points")
    private Long totalPoints;

    @Column(nullable = true, name = "gained_points")
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
    @Convert(converter = JsonNodeConverter.class)
    private JsonNode content;

}
