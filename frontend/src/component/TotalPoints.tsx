import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type Props = {
  number: number;
};

function TotalPoint({ number }: Props) {
  const { palette } = useTheme();

  const CircleContainer = styled("div")({
    width: "100px",
    height: "100px",
    border: `2px solid ${palette.primary[400]}`,
    borderRadius: "50%",
    position: "relative",
  });

  const Point = styled("div")({
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  const NumberText = styled(Typography)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    color: palette.secondary[400],
    fontSize: 40,
  });
  return (
    <CircleContainer>
      <Point />
      <NumberText variant="body1">{number}</NumberText>
    </CircleContainer>
  );
}

export default TotalPoint;
