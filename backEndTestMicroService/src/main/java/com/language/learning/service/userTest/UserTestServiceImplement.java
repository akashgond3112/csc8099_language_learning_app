package com.language.learning.service.userTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.language.learning.dto.UserTestDto;
import com.language.learning.entity.User;
import com.language.learning.entity.UserTest;
import com.language.learning.entity.UserTestItem;
import com.language.learning.entity.UserTestItemRepository;
import com.language.learning.enums.Status;
import com.language.learning.exception.UserTestException;
import com.language.learning.repository.UserTestRepository;
import com.language.learning.responses.userTest.UserTestItemResponse;
import com.language.learning.responses.userTest.UserTestResponse;
import com.language.learning.service.questions.QuestionsService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

import static com.language.learning.utilities.Utilities.getJsonObject;

/**
 * @author agond
 * @Project spring-boot-library
 * @Date 17072023
 * Copyright (C) 2023 Newcastle University, UK
 */
@Service
@Slf4j
public class UserTestServiceImplement implements UserTestService {
    @Autowired
    private UserTestItemRepository userTestItemRepository;

    @Autowired
    QuestionsService questionsService;

    @Autowired
    UserTestRepository userTestRepository;

    @Override
    public UserTestResponse createUserTest(User user) {

        AtomicInteger totalPoints = new AtomicInteger();
        Set<JSONObject> userItems = new HashSet<JSONObject>();
        ArrayList<String> itemIdArray = new ArrayList<>();

        if ((userTestRepository.findByUserAndStatus(user, Status.IN_PROGRESS) != null) || (userTestRepository.findByUserAndStatus(user, Status.START) != null)) {
            throw new UserTestException("User test is already created and is in-progress, cannot create new one.");
        }

        /*Get all the questions from content server!*/
        ArrayList allQuestions = (ArrayList) questionsService.getAllQuestions();
        JSONArray array = new JSONArray(allQuestions);
        log.info("All Question : {}", allQuestions);

        for (Object jsonObject : array) {
            JSONObject json = (JSONObject) jsonObject;
            totalPoints.getAndAdd(json.getInt("total_points"));
            itemIdArray.add(json.getString("_id"));
            userItems.add(json);
        }
        /*Create user test*/
        UserTest userTest = new UserTest();
        userTest.setUser(user);
        userTest.setStatus(Status.IN_PROGRESS);
        userTest.setTotalPoints((long) totalPoints.get());
        userTest.setGainedPoints(0L);
        try {
            if (userItems.size() > 0) {

                userTest.setTotalQuestions((long) userItems.size());
            } else {
                throw new RuntimeException("Total number of question cannot be less than 0.");
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
        userTest.setQuestionAttempted(0L);
        userTest.setCurrentIndex(0L);
        userTest.setTestItems(itemIdArray.toString());

        /*
         * Process the userItems and set the first JSONObject as the currentItem in the Set it as current item object.
         * @throws JsonProcessingException If there's an error while processing JSON data.
         */
        if (!userItems.isEmpty()) {
            JSONObject currentItem = userItems.iterator().next();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonData = objectMapper.readTree(currentItem.toString());
                userTest.setCurrentItem(jsonData);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }

        userTestRepository.save(userTest);

        /*Create user test item*/
        List<UserTestItem> userTestItems = new ArrayList<>();
        for (JSONObject item : userItems) {
            UserTestItem userTestItem = new UserTestItem();
            userTestItem.setUser(user);
            userTestItem.setUserTest(userTest);
            userTestItem.setStatus(Status.START);
            userTestItem.setTotalPoints((long) item.getInt("total_points"));
            userTestItem.setGainedPoints(0L);
            userTestItem.setAnswer(null);

            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonData = objectMapper.readTree(String.valueOf(item));
                userTestItem.setContent(jsonData);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            userTestItemRepository.save(userTestItem);
            userTestItems.add(userTestItem);
        }

        /*Return user Test Response*/
        return generateUserTestResponse(userTest, userTestItems);
    }

    @Override
    public UserTestResponse updateUserTest(User user, UserTestDto userTestDto, Long userTestId) {

        UserTest userTest = userTestRepository.findByIdAndUser(userTestId, user);
        if (userTestDto.getStatus() != null) {
            userTest.setStatus(userTestDto.getStatus());
        }
        if (userTestDto.getGainedPoints() != null) {
            userTest.setGainedPoints(userTest.getGainedPoints() + userTestDto.getGainedPoints());
        }
        if (userTestDto.getQuestionAttempted() != null) {
            userTest.setQuestionAttempted(userTest.getQuestionAttempted() + userTestDto.getQuestionAttempted());
        }
        if (userTestDto.getCurrentItem() != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonData = objectMapper.readTree(userTestDto.getCurrentItem());
                userTest.setCurrentItem(jsonData);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        if (userTestDto.getCurrentIndex() != null) {
            userTest.setCurrentIndex(userTestDto.getCurrentIndex());
        }
        userTestRepository.save(userTest);
        return generateUserTestResponse(userTest, userTestItemRepository.findAllByUserAndUserTest(user, userTest));
    }

    @Override
    public UserTestResponse getUserTest(User user, Long userTestId) {
        /*Get the user test!*/
        UserTest userTest = userTestRepository.findByIdAndUser(userTestId, user);
        if (userTest == null)
            throw new UserTestException(String.format("Cannot find the assigned user test for test id %s for the user %s", userTestId, user.getId()));
        List<UserTestItem> userTestItems = userTestItemRepository.findAllByUserAndUserTest(user, userTest);
        if (userTestItems == null)
            throw new UserTestException(String.format("Cannot find the assigned user test items for test id %s for the user %s", userTestId, user.getId()));
        return generateUserTestResponse(userTest, userTestItems);
    }

    /**
     * @param user   User object
     * @param status can be either start, in-progress, completed
     * @return UserTestResponse
     */
    @Override
    public List<UserTestResponse> getAllUserTest(User user, Status status) {

        /*Get all user test! based on status*/
        List<UserTest> userTests = null;
        if (status != null) {
            userTests = userTestRepository.findAllByUserAndStatus(user, status);
        } else {
            userTests = userTestRepository.findAllByUser(user);
        }

        /*Create an empty List of UserTestResponse, Loop through each userTests and generate the response*/
        List<UserTestResponse> userTestResponses = new ArrayList<>();
        if (userTests.size() > 0)
            userTests.forEach(userTest -> userTestResponses.add(generateUserTestResponse(userTest)));
        return userTestResponses;
    }


    private UserTestResponse generateUserTestResponse(UserTest userTest, List<UserTestItem> userTestItem) {

        List<UserTestItemResponse> userTestItemResponses = new ArrayList<>();

        userTestItem.forEach(userTestItem1 -> {
            userTestItemResponses.add(UserTestItemResponse.builder()
                    .userId(userTest.getUser().getId())
                    .testId(userTest.getId())
                    .status(userTestItem1.getStatus().getValue())
                    .content(userTestItem1.getContent().toString())
                    .totalPoints(userTestItem1.getTotalPoints())
                    .gainedPoints(userTestItem1.getGainedPoints())
                    .answer(userTestItem1.getAnswer())
                    .updated_at(userTestItem1.getUpdated_at()).build());
        });

        return UserTestResponse.builder()
                .userId(userTest.getUser().getId())
                .testId(userTest.getId())
                .status(userTest.getStatus().getValue())
                .totalPoints(userTest.getTotalPoints())
                .gainedPoints(userTest.getGainedPoints())
                .totalQuestions(userTest.getTotalQuestions())
                .questionAttempted(0L)
                .currentItem(userTest.getCurrentItem().toString())
                .testItems(userTest.getTestItems())
                .updated_at(userTest.getUpdated_at())
                .userTestItemResponses(userTestItemResponses)
                .currentIndex(0L)
                .build();
    }

    private UserTestResponse generateUserTestResponse(UserTest userTest) {

        return UserTestResponse.builder()
                .userId(userTest.getUser().getId())
                .testId(userTest.getId())
                .status(userTest.getStatus().getValue())
                .totalPoints(userTest.getTotalPoints())
                .gainedPoints(userTest.getGainedPoints())
                .totalQuestions(userTest.getTotalQuestions())
                .questionAttempted(0L)
                .updated_at(userTest.getUpdated_at())
                .build();
    }
}
