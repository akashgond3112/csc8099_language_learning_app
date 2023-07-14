import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { QuestionsResponse } from "../../../state/types";

type Props = {
  question: QuestionsResponse;
};

function Mcq({ question }: Props) {
  const { palette } = useTheme();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(value);

    if (question.options[value].isCorrect) {
      setHelperText("You got it!");
      setError(false);
    } else if (!question.options[value].isCorrect) {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} id={question.id}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel
          id="demo-error-radios"
          sx={{ color: palette.grey[300], fontSize: 20 }}
        >
          {question.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {question.options.map((_option: any, i: number) => {
            return (
              <FormControlLabel
                id={_option.id}
                value={i}
                control={
                  <Radio
                    sx={{
                      color: palette.grey[300],
                      "&.Mui-checked": {
                        color: palette.grey[300],
                      },
                    }}
                  />
                }
                label={_option.content}
              />
            );
          })}
        </RadioGroup>
        <FormHelperText sx={{ color: palette.grey[300] }}>
          {helperText}
        </FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}

export default Mcq;
