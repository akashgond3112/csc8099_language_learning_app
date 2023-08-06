package com.language.learning.repository;

import com.language.learning.entity.Token;
import com.language.learning.entity.User;
import com.language.learning.entity.UserTest;
import com.language.learning.entity.UserTestItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Team-alpha
 * @Project spring-boot-library
 * @Date 23042023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
            select t from Token t inner join User u\s
            on t.user.id = u.id\s
            where u.id = :id and (t.expired = false or t.revoked = false)\s
            """)
    List<Token> findAllValidTokenByUser(Long id);

    Optional<Token> findByToken(String token);

    List<Token> findAllByUser(User user);

}
