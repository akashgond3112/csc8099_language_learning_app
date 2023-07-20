package com.language.learning.repository;

import com.language.learning.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 15042023
 *       Copyright (C) 2023 Newcastle University, UK
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUsername(String userName);
}