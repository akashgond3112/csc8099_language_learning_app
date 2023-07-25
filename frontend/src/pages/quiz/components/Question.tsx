import { Box } from "@mui/material";
import Mcq from "./Mcq";
import Fib from "./FillBlank";
import MatchQuestion from "./MatchTheFollowing";
import { QuestionsResponse, UserTestItemResponses } from "../../../state/types";
import AnimatedMcqQuestion from "./AnimatedMCQ";
import WordBuilder from "./BuildWord";

type Props = {
  // ques: QuestionsResponse;
  userTestItemResponses: UserTestItemResponses;
};

function Question({ userTestItemResponses }: Props) {
  const ques: QuestionsResponse = JSON.parse(userTestItemResponses.content);

  return (
    <Box>
      {ques.type === "mcq" && <Mcq question={ques} />}
      {ques.type === "fib" && <Fib question={ques} />}
      {ques.type === "mtf" && <MatchQuestion question={ques} />}
      {ques.type === "amcq" && <AnimatedMcqQuestion question={ques} />}
      {ques.type === "wb" && <WordBuilder question={ques} />}
    </Box>
  );
}

export default Question;
