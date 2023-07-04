import { Box } from "@mui/material";
import FlexBetween from "../../../component/FlexBetween";
import CustomButton from "../../../component/CustomButton";
import Question from "./Question";

type Props = {};

function Quiz({}: Props) {
  function onNext() {
    console.log("Clicked on Next");
  }

  function onPrevious() {
    console.log("Clicked on Previous");
  }

  return (
    <Box>
      {/* display Question */}
      <FlexBetween>
        <Box padding={10}>
          <Question />
        </Box>
      </FlexBetween>
      {/* display Next previous buttons */}
      <FlexBetween>
        <Box>
          <CustomButton text="Previous" onClick={onPrevious} />
        </Box>
        <Box>
          <CustomButton text="Next" onClick={onNext} />
        </Box>
      </FlexBetween>
    </Box>
  );
}

export default Quiz;
