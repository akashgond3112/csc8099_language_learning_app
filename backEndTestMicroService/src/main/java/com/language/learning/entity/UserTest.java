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
 * @author Akash Gond
 * @Project spring-boot-library
 * @Date 15042023 Copyright (C) 2023 Newcastle University, UK
 */
@Entity
@Table(name = "usertest")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //	@ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userId", nullable = false, updatable = false)
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = true, name = "totalPoints")
    private Long totalPoints;

    @Column(nullable = true, name = "gainedPoints")
    private Long gainedPoints;

    @Column(nullable = true, name = "totalQuestions")
    private Long totalQuestions;

    @Column(nullable = true, name = "questionAttempted")
    private Long questionAttempted;

    @Column(nullable = true, name = "currentIndex")
    private int currentIndex;

    @Column(nullable = false, name = "currentItem")
    private String currentItem;

    @Column(nullable = false, name = "testItems")
    private String testItems;

    @Column(nullable = false,updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    @Column(nullable = false,updatable = true)
    @UpdateTimestamp
    private LocalDateTime updated_at;

    @PrePersist
    public void onPrePersist() {
        this.created_at = LocalDateTime.now();
    }

}

