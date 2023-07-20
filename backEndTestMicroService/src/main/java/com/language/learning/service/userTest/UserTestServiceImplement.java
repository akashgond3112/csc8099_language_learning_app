package com.language.learning.service.userTest;

import com.language.learning.entity.User;
import com.language.learning.responses.userTest.UserTestResponse;
import com.language.learning.dto.UserTestDto;
import com.language.learning.service.questions.QuestionsService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Service
public class UserTestServiceImplement implements UserTestService{

    @Autowired
    QuestionsService questionsService;

    @Override
    public UserTestResponse createUserTest(User user, UserTestDto userTestDto) {

        int totalPoints;
        Set<String> currentItem = new HashSet<>();

        /*Get all the questions from content server!*/
//        JSONArray allQuestions = questionsService.getAllQuestions();
//        allQuestions.forEach(System.out::println);
        /*Parse the Object */

        /*Create user test*/
        /*Create user test item*/
        /*Build user Item Response*/
        /*Build user Test Response*/
        /*Return user Test Response*/
        return null;
    }

    @Override
    public UserTestResponse updateUserTest(User user, UserTestDto userTestDto) {
        return null;
    }

    @Override
    public UserTestResponse getUserTest(User user, Long userTestId) {
        /*Get all the questions from content server!*/
        ArrayList allQuestions = (ArrayList) questionsService.getAllQuestions();
        JSONArray array = new JSONArray(allQuestions);
        array.forEach(jsonObject ->{
            JSONObject json= (JSONObject) jsonObject;
            String value = json.getString("_id");
            System.out.println(value);
        });

        return null;
    }
}
