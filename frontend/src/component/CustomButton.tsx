import { Button, ButtonProps, styled, useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";

type Props = {
  text: string;
  onClick?: any;
  disabled?: boolean;
  type?: any;
};

function CustomButton({ text, onClick, disabled, type }: Props) {
  const { palette } = useTheme();

  function clickHandler() {
    onClick();
  }
  let color = "";

  if (text === "Previous") {
    color = palette.secondary[400];
  } else if (text === "Next") {
    color = palette.primary[400];
  } else {
    color = palette.tertiary[500];
  }
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: color,
    // width: "100px",
    "&:hover": {
      backgroundColor: color,
    },
  }));
  return (
    <ColorButton
      type={type ? type : undefined}
      variant="contained"
      onClick={onClick ? clickHandler : undefined}
      sx={{ color: "black" }}
      disabled={disabled}
    >
      {text}
    </ColorButton>
  );
}

export default CustomButton;
