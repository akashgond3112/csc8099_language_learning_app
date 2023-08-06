package com.language.learning.repository;

import com.language.learning.entity.LeaderBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 7/29/23-07-2023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Repository
public interface LeaderBoardRepository extends JpaRepository<LeaderBoard, Long> {
    List<LeaderBoard> findAllByOrderByScoreDesc();

}
