import { Box } from "@mui/material";
import Mcq from "./Mcq";
import Fib from "./FillBlank";
import MatchQuestion from "./MatchTheFollowing";
import { QuestionsResponse } from "../../../state/types";
import AnimatedMcqQuestion from "./AnimatedMCQ";
import WordBuilder from "./BuildWord";

type Props = {
  ques: QuestionsResponse;
};

function Question({ ques }: Props) {
  return (
    <Box>
      {ques.type === "mcq" && <Mcq question={ques} />}
      {ques.type === "fib" && <Fib question={ques} />}
      {ques.type === "mtf" && <MatchQuestion question={ques} />}
      {ques.type === "mtf" && <AnimatedMcqQuestion question={ques} />}
      {ques.type === "mtf" && <WordBuilder question={ques} />}
    </Box>
  );
}

export default Question;
