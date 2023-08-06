package com.language.learning.service.userTest;

import com.language.learning.dto.UserTestDto;
import com.language.learning.dto.UserTestItemDto;
import com.language.learning.entity.User;
import com.language.learning.enums.Status;
import com.language.learning.responses.userTest.UserTestResponse;

import java.util.List;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public interface UserTestService {

    UserTestResponse createUserTest(User user);
    UserTestResponse updateUserTest(User user, UserTestDto userTestDto, Long userTestId);
    UserTestResponse getUserTest(User user, Long userTestId, String intent);
    List<UserTestResponse> getAllUserTest(User user, Status status);
    UserTestResponse evaluateTestItem(User user, Long userTestId, UserTestItemDto userTestItemDto);

}
