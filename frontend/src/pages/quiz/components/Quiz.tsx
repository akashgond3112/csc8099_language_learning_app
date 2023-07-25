import { Box } from "@mui/material";
import CustomButton from "../../../component/CustomButton";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/utils";
import Question from "./Question";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { UserTestDetail } from "../../../state/types";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const axiosprivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userTest, setUserTests] = useState<UserTestDetail | undefined>();

  const key = window.location.pathname.split("/")[2];

  /* const { data, error, isLoading, isFetching, isSuccess } =
    useGetQuestionsQuery(); */

  const trace = useAppSelector((state) => state.questions.trace);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUserTests = async () => {
      try {
        const response = await axiosprivate.get(`/api/v1/user/test/${key}`, {
          signal: controller.signal,
        });

        isMounted && setUserTests(response.data);
      } catch (err) {
        console.error("Something went wrong", err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    getUserTests();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    console.log(trace);
  }, [trace]);

  function onNext() {
    let isMounted = true;
    const controller = new AbortController();
    const getUserTests = async () => {
      try {
        const response = await axiosprivate.get(
          `/api/v1/user/test/${key}?intent=next`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setUserTests(response.data);
      } catch (err) {
        console.error("Something went wrong", err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    getUserTests();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }

  function onPrevious() {
    let isMounted = true;
    const controller = new AbortController();
    const getUserTests = async () => {
      try {
        const response = await axiosprivate.get(
          `/api/v1/user/test/${key}?intent=previous`,
          {
            signal: controller.signal,
          }
        );

        isMounted && setUserTests(response.data);
      } catch (err) {
        console.error("Something went wrong", err);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    getUserTests();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }

  return (
    <Box>
      {/* display Question */}
      <Box padding={10}>
        {/*         {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Something went wrong</Typography>}
        {isFetching && <Typography>Fetching...</Typography>}
        {isSuccess && <Question ques={data[trace]} />} */}
        {userTest && (
          <Question userTestItemResponses={userTest.userTestItemResponses} />
        )}
      </Box>
      {/* display Next previous buttons */}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <CustomButton text="Previous" onClick={onPrevious} />
        </Box>
        <Box>
          <CustomButton text="Next" onClick={onNext} />
        </Box>
      </Box>
    </Box>
  );
}

export default Quiz;
