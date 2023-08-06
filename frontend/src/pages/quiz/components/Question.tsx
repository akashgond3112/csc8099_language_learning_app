import { Box } from "@mui/material";
import Mcq from "./Mcq";
import Fib from "./FillBlank";
import MatchQuestion from "./MatchTheFollowing";
import { UserTestItemResponses } from "../../../state/types";
import AnimatedMcqQuestion from "./AnimatedMCQ";
import WordBuilder from "./BuildWord";

type Props = {
  userTestItemResponses: UserTestItemResponses;
};

function Question({ userTestItemResponses }: Props) {
  return (
    <Box>
      {userTestItemResponses.type === "mcq" && (
        <Mcq userTestItemResponses={userTestItemResponses} />
      )}
      {userTestItemResponses.type === "fib" && (
        <Fib userTestItemResponses={userTestItemResponses} />
      )}
      {userTestItemResponses.type === "mtf" && (
        <MatchQuestion userTestItemResponses={userTestItemResponses} />
      )}
      {userTestItemResponses.type === "amcq" && (
        <AnimatedMcqQuestion userTestItemResponses={userTestItemResponses} />
      )}
      {userTestItemResponses.type === "wb" && (
        <WordBuilder userTestItemResponses={userTestItemResponses} />
      )}
    </Box>
  );
}

export default Question;
