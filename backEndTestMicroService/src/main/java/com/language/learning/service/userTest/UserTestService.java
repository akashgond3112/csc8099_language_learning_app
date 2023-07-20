package com.language.learning.service.userTest;

import com.language.learning.entity.User;
import com.language.learning.responses.userTest.UserTestResponse;
import com.language.learning.dto.UserTestDto;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
public interface UserTestService {

    UserTestResponse createUserTest(User user, UserTestDto userTestDto);
    UserTestResponse updateUserTest(User user, UserTestDto userTestDto);
    UserTestResponse getUserTest(User user, Long userTestId);

}
