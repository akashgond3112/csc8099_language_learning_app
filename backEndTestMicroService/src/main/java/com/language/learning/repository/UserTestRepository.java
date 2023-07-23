package com.language.learning.repository;

import com.language.learning.entity.User;
import com.language.learning.entity.UserTest;
import com.language.learning.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 22102023
 * Copyright (C) 2023 Newcastle University, UK
 */
public interface UserTestRepository extends JpaRepository<UserTest, Long> {

    List<UserTest> findAllByUser(User user);

    UserTest findByUserAndStatus(User user, Status status);

    List<UserTest> findAllByUserAndStatus(User user, Status status);

    UserTest findByIdAndUser(long id, User user);

}
