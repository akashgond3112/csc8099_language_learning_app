import { Box, Button, List, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserTestDetail } from "../../state/types";

export default function StartQuiz() {
  const { palette } = useTheme();

  const axiosprivate = useAxiosPrivate();
  const [userTest, setUserTests] = useState<UserTestDetail | undefined>();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUserTests = async () => {
      try {
        const response = await axiosprivate.get("/api/v1/user/tests", {
          signal: controller.signal,
        });
        response.data.map((dt: any) => {
          isMounted && setUserTests(dt);
        });
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

  const handleOnclick = () => {
    navigate(`/quiz/${userTest?.testId}`);
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      gap={"1.5rem"}
      color={palette.grey[300]}
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h1" gutterBottom>
          Welcome to the Quiz.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <List>
            <Typography variant="h3" gutterBottom>
              1) You will be asked 10 questions one after the another.
            </Typography>
            <Typography variant="h3" gutterBottom>
              2) 10 points is awarded for each correct answer
            </Typography>
            <Typography variant="h3" gutterBottom>
              3) You can review and change answer before finishing the quiz.
            </Typography>
            <Typography variant="h3" gutterBottom>
              4) The result wil be declared at the end of the quiz.
            </Typography>
          </List>
        </Box>
        {userTest && (
          <Box>
            <Button onClick={() => handleOnclick()}>{userTest.status}</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
