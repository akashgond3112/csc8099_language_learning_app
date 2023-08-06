import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "../../../component/CustomButton";
import TotalPoint from "../../../component/TotalPoints";
import CustomProgressBars from "../../../component/CustomProgressBars";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/utils";
import Question from "./Question";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchQuestionData,
  navigateQuestion,
} from "../../../store/actions/question-action";

function Quiz() {
  const { palette } = useTheme();
  const axiosprivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // const [userTest, setUserTests] = useState<UserTestDetail | undefined>();

  const key = window.location.pathname.split("/")[2];

  const { userTest, isLoading, err } = useAppSelector(
    (state) => state.questions
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    dispatch(
      fetchQuestionData(
        isMounted,
        controller,
        key,
        axiosprivate,
        location,
        navigate
      )
    );
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  function onNext() {
    let isMounted = true;
    const controller = new AbortController();
    dispatch(
      navigateQuestion(
        isMounted,
        controller,
        key,
        axiosprivate,
        location,
        navigate,
        "next"
      )
    );

    return () => {
      isMounted = false;
      controller.abort();
    };
  }

  function onPrevious() {
    let isMounted = true;
    const controller = new AbortController();
    dispatch(
      navigateQuestion(
        isMounted,
        controller,
        key,
        axiosprivate,
        location,
        navigate,
        "previous"
      )
    );

    return () => {
      isMounted = false;
      controller.abort();
    };
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress
          size={"4rem"}
          sx={{ color: palette.secondary[500] }}
        />
        <Typography variant="h4">Loading</Typography>
      </Box>
    );
  }

  return (
    /* Main container */
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {/* display Question */}
      <Box padding={"2rem"} sx={{ flex: 9 }}>
        {userTest && (
          <Question userTestItemResponses={userTest.userTestItemResponses} />
        )}
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: `${palette.secondary[200]}` }}
      />
      {/* SideBar */}
      <Box
        sx={{
          height: "90vh",
          flex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        {/* display Question details*/}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
            gap: 2,
          }}
        >
          {/* Progress Bar */}

          <Box>
            <TotalPoint
              number={
                userTest ? userTest?.userTestItemResponses.totalPoints : 0
              }
            />
            <Typography
              variant="h4"
              sx={{ color: palette.secondary[400], paddingTop: "0.5rem" }}
            >
              Question points
            </Typography>
          </Box>
          <Divider
            sx={{
              borderColor: `${palette.secondary[200]}`,
            }}
          />
          <Box>
            <Typography variant="h4" sx={{ color: palette.secondary[400] }}>
              {userTest && userTest.userTestItemResponses.difficultyLevel}
            </Typography>
          </Box>
          <Divider
            sx={{
              borderColor: `${palette.secondary[200]}`,
            }}
          />
          <Box>
            <Typography variant="h4" sx={{ color: palette.secondary[400] }}>
              {userTest && userTest.userTestItemResponses.bloomsLevel}
            </Typography>
          </Box>
          <Divider
            sx={{
              borderColor: `${palette.secondary[200]}`,
            }}
          />
          <CustomProgressBars
            pointsGained={userTest ? userTest?.gainedPoints : 0}
            totalPoints={userTest ? userTest?.totalPoints : 0}
          />
        </Box>
        {/* Buttons */}
        <Box>
          <Box padding={"0.5rem"}>
            <CustomButton text="Previous" onClick={onPrevious} />
          </Box>
          <Box padding={"0.5rem"}>
            <CustomButton text="Next" onClick={onNext} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Quiz;
