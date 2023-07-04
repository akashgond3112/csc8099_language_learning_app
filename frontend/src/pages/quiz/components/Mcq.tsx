import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

type Props = {};

function Mcq({}: Props) {
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

    if (value === "best") {
      setHelperText("You got it!");
      setError(false);
    } else if (value === "worst") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel
          id="demo-error-radios"
          sx={{ color: palette.grey[300], fontSize: 20 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          numquam illum facilis? Rem distinctio vel minima sed, nesciunt quia
          natus corrupti quos cumque reiciendis, accusantium voluptatem
          pariatur, laudantium blanditiis quod.
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="best"
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
            label="The best!"
          />
          <FormControlLabel
            value="worst"
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
            label="The worst."
          />
        </RadioGroup>
        <FormHelperText sx={{ color: palette.grey[300] }}>
          {helperText}
        </FormHelperText>
        <Button
          sx={{ mt: 1, mr: 1 }}
          type="submit"
          variant="outlined"
        >
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}

export default Mcq;
