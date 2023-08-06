package com.language.learning.repository;

import com.language.learning.entity.User;
import com.language.learning.entity.UserTest;
import com.language.learning.entity.UserTestItem;
import com.language.learning.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 7/30/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Repository
public interface UserTestItemRepository extends JpaRepository<UserTestItem, Long> {
    List<UserTestItem> findAllByUserAndUserTest(User user, UserTest userTest);

    UserTestItem findByUserTestItemIdAndUserTestAndUser(String userTestItemId, UserTest userTest, User user);

    UserTestItem findByUserTestItemIdAndUserTestIdAndUser(String userTestItemId, Long userTestId, User user);

    List<UserTestItem> findAllByUserTestIdAndUserAndStatus(Long userTestId, User user, Status status);
}
