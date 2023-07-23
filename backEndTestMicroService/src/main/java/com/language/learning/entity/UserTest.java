package com.language.learning.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = true, name = "total_points")
    private Long totalPoints;

    @Column(nullable = true, name = "gained_points")
    private Long gainedPoints;

    @Column(nullable = true, name = "total_questions")
    private Long totalQuestions;

    @Column(nullable = true, name = "question_attempted")
    private Long questionAttempted;

    @Column(nullable = true, name = "current_index")
    private Long currentIndex;

    @Column(nullable = false, name = "current_item")
    @Convert(converter = JsonNodeConverter.class)
    private JsonNode currentItem;

    @Column(nullable = false, name = "test_items")
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
