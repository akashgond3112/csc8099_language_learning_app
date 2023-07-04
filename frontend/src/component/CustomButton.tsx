import { Button, ButtonProps, styled, useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";

type Props = {
  text: string;
  onClick?: any;
};

function CustomButton({ text, onClick }: Props) {
  const { palette } = useTheme();

  function clickHandler() {
    onClick();
  }
  let color = "";

  if (text === "Previous") {
    color = palette.secondary[400];
  } else if (text === "Next") {
    color = palette.primary[400];
  }
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: color,
    "&:hover": {
      backgroundColor: color,
    },
  }));
  return (
    <ColorButton variant="contained" onClick={clickHandler}>
      {text}
    </ColorButton>
  );
}

export default CustomButton;
