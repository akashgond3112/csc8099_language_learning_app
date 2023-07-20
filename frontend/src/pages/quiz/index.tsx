import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../component/CustomButton";
import Quiz from "./components/Quiz";

const StartQuiz = () => {
  const { palette } = useTheme();

  const [showTest, setShowTest] = useState(false);

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
      {!showTest && (
        <Box
          sx={{
            display:"flex",
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
          <Box>
            <Link to={""}>
              <CustomButton
                text="Start Quiz"
                onClick={() => setShowTest(!showTest)}
              />
            </Link>
          </Box>
        </Box>
      )}
      {showTest && (
        <Box>
          <Quiz />
        </Box>
      )}
    </Box>
  );
};

export default StartQuiz;
