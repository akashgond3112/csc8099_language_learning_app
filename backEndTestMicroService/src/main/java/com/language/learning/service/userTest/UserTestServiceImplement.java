package com.language.learning.service.userTest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.language.learning.dto.UserTestDto;
import com.language.learning.dto.UserTestItemDto;
import com.language.learning.entity.User;
import com.language.learning.entity.UserTest;
import com.language.learning.entity.UserTestItem;
import com.language.learning.enums.Status;
import com.language.learning.exception.UserTestException;
import com.language.learning.repository.UserTestItemRepository;
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
            if (!userItems.isEmpty()) {

                userTest.setTotalQuestions((long) userItems.size());
            } else {
                throw new RuntimeException("Total number of question cannot be less than 0.");
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
        userTest.setQuestionAttempted(0L);
        userTest.setCurrentIndex(1L);
        userTest.setTestItems(itemIdArray.toString());
        userTest.setCurrentItem(itemIdArray.get(0));
        userTestRepository.save(userTest);

        /*Create user test item*/
        List<UserTestItem> userTestItems = new ArrayList<>();
        for (JSONObject item : userItems) {
            UserTestItem userTestItem = new UserTestItem();
            userTestItem.setUser(user);
            userTestItem.setUserTest(userTest);
            userTestItem.setStatus(Status.START);
            userTestItem.setTotalPoints((long) item.getInt("total_points"));
            userTestItem.setBloomsLevel(item.getString("blooms_level"));
            userTestItem.setDifficultyLevel(item.getString("difficulty_level"));
            userTestItem.setType(item.getString("type"));
            userTestItem.setGainedPoints(0L);
            userTestItem.setAnswer(null);
            userTestItem.setUserTestItemId(item.getString("_id"));
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
        return generateUserTestResponse(userTest, userTestItems.get(0));
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
            userTest.setCurrentItem(userTestDto.getCurrentItem());
        }
        if (userTestDto.getCurrentIndex() != null) {
            userTest.setCurrentIndex(userTestDto.getCurrentIndex());
        }
        userTestRepository.save(userTest);
        UserTestItem userTestItem = userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(userTest.getCurrentItem(), userTest, user);
        return generateUserTestResponse(userTest, userTestItem);
    }

    @Override
    public UserTestResponse getUserTest(User user, Long userTestId, String intent) {

        /*Check is intent is null , if its null set it defaults to start else it can be previous or next. */
        /*Get the user test!*/
        UserTest userTest = userTestRepository.findByIdAndUser(userTestId, user);
        if (userTest == null)
            throw new UserTestException(String.format("Cannot find the assigned user test for test id %s for the user %s", userTestId, user.getId()));

        UserTestItem itemByIntent = getItemByIntent(userTest, intent);
        if (itemByIntent == null)
            throw new UserTestException(String.format("Cannot find the user test items for test id %s for the user %s, for the provided intent %s", userTestId, user.getId(), intent));

        return generateUserTestResponse(userTest, itemByIntent);
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
        if (!userTests.isEmpty())
            userTests.forEach(userTest -> userTestResponses.add(generateUserTestResponse(userTest)));
        return userTestResponses;
    }

    /**
     * @param user
     * @param userTestId
     * @param userTestItemDto
     * @return
     */
    @Override
    public UserTestResponse evaluateTestItem(User user, Long userTestId, UserTestItemDto userTestItemDto) {

        UserTestItem userTestItem = userTestItemRepository.findByUserTestItemIdAndUserTestIdAndUser(userTestItemDto.getUserTestItemId(), userTestId, user);

        if (userTestItem == null)
            throw new UserTestException("Cannot find the user item for the provided parameters;");
        if (userTestItemDto.getIsCorrect()) {
            userTestItem.setGainedPoints(userTestItemDto.getGainedPoints());
            userTestItem.setIsCorrect(true);
        } else {
            userTestItem.setGainedPoints(0L);
            userTestItem.setIsCorrect(false);
        }
        userTestItem.setStatus(Status.COMPLETED);

        if(userTestItemDto.getAnswer() !=null) userTestItem.setAnswer(userTestItemDto.getAnswer());
        userTestItemRepository.save(userTestItem);

        long previouslyTotalGainedPoints = userTestItem.getUserTest().getGainedPoints();
        long previouslyQuestionAttempted = userTestItem.getUserTest().getQuestionAttempted();
        userTestItem.getUserTest().setGainedPoints(previouslyTotalGainedPoints + userTestItem.getGainedPoints());
        userTestItem.getUserTest().setQuestionAttempted(previouslyQuestionAttempted + 1);


        /*Check if user has attempted all the item by checking the status as completed if the queries return null it means
         * all the item is completed , hence test is also completed*/

        boolean isAllItemAttempted = userTestItemRepository.findAllByUserTestIdAndUserAndStatus(userTestId, user, Status.START).isEmpty();

        if (isAllItemAttempted) {
            // Complete the test as well
            userTestItem.getUserTest().setStatus(Status.COMPLETED);
        }

        userTestRepository.save(userTestItem.getUserTest());

        return generateUserTestResponse(userTestItem.getUserTest(), userTestItem);
    }


    private UserTestResponse generateUserTestResponse(UserTest userTest, UserTestItem userTestItem) {

        UserTestItemResponse userTestItemResponses = UserTestItemResponse.builder()
                .userId(userTest.getUser().getId())
                .testId(userTest.getId())
                .testItemId(userTestItem.getUserTestItemId())
                .status(userTestItem.getStatus().getValue())
                .content(userTestItem.getContent().toString())
                .totalPoints(userTestItem.getTotalPoints())
                .gainedPoints(userTestItem.getGainedPoints())
                .answer(userTestItem.getAnswer())
                .bloomsLevel(userTestItem.getBloomsLevel())
                .difficultyLevel(userTestItem.getDifficultyLevel())
                .type(userTestItem.getType())
                .updated_at(userTestItem.getUpdated_at()).build();

        if(userTestItem.getIsCorrect() !=null){
            userTestItemResponses.setIsCorrect(userTestItem.getIsCorrect());
        }

        return UserTestResponse.builder()
                .userId(userTest.getUser().getId())
                .testId(userTest.getId())
                .status(userTest.getStatus().getValue())
                .totalPoints(userTest.getTotalPoints())
                .gainedPoints(userTest.getGainedPoints())
                .totalQuestions(userTest.getTotalQuestions())
                .questionAttempted(0L)
                .currentItem(userTest.getCurrentItem())
                .testItems(userTest.getTestItems())
                .updated_at(userTest.getUpdated_at())
                .userTestItemResponses(userTestItemResponses)
                .currentIndex(userTest.getCurrentIndex())
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
                .questionAttempted(userTest.getQuestionAttempted())
                .updated_at(userTest.getUpdated_at())
                .build();
    }

    public UserTestItem getItemByIntent(UserTest userTest, String intent) {
        int currentIndex = -1;
        JSONArray array = new JSONArray(userTest.getTestItems());

        for (int i = 0; i < array.length(); i++) {
            if (Objects.equals(array.get(i), userTest.getCurrentItem())) {
                currentIndex = i;
                break;
            }
        }

        UserTestItem userTestItem = null;

        if (currentIndex == -1) {
            return null; // Item with the currentId not found in the list
        }
        if (intent == null) {
            return userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(userTest.getCurrentItem(), userTest, userTest.getUser());
        }

        switch (Objects.requireNonNull(intent)) {
            case "next" -> {
                currentIndex = (currentIndex + 1) % array.length();
                if (currentIndex == 0) {
                    // The user is on the last item, so return the current item
                    return userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(array.getString(currentIndex), userTest, userTest.getUser());
                } else {
                    userTestItem = userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(array.getString(currentIndex), userTest, userTest.getUser());
                    userTest.setCurrentIndex((long) currentIndex);
                    userTest.setCurrentItem(userTestItem.getUserTestItemId());
                    userTestRepository.save(userTest);
                }
            }
            case "previous" -> {
                currentIndex = (currentIndex - 1 + array.length()) % array.length();
                if (currentIndex == array.length() - 1) {
                    // The user is on the first item, so return the current item
                    return userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(array.getString(currentIndex), userTest, userTest.getUser());
                } else {
                    userTestItem = userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(array.getString(currentIndex), userTest, userTest.getUser());
                    userTest.setCurrentIndex((long) currentIndex);
                    userTest.setCurrentItem(userTestItem.getUserTestItemId());
                    userTestRepository.save(userTest);
                }
            }
            case "start" -> {
                return userTestItemRepository.findByUserTestItemIdAndUserTestAndUser(userTest.getCurrentItem(), userTest, userTest.getUser());
            }
        }

        return userTestItem;
    }
}
