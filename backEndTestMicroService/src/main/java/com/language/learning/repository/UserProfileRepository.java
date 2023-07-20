package com.language.learning.repository;

import com.language.learning.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

//    @Query("SELECT r FROM UserProfile AS r JOIN User AS u ON r.user.id = u.id WHERE u.id =:userId")
//    UserProfile findByUserId(@Param("userId") String userId);

    @Query("SELECT u FROM UserProfile AS u JOIN u.user AS r WHERE r.id = :userId")
    UserProfile findByUserId(@Param("userId") String userId);

}
