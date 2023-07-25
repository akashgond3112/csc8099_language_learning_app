package com.language.learning.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTestItemRepository extends JpaRepository<UserTestItem, Long> {

    List<UserTestItem> findAllByUserAndUserTest(User user, UserTest userTest);

    UserTestItem findByUserTestItemIdAndUserTestAndUser(String userTestItemId, UserTest userTest, User user);
}