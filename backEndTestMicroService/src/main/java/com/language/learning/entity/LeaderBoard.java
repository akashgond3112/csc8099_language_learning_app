package com.language.learning.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * @Date 7/29/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */

@Entity
@Table(name = "leaderboard")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = true, name = "score")
    private Long score;

    @Column(nullable = false,updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    @Column(nullable = false,updatable = true)
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
