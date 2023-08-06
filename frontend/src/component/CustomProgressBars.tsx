import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

type Props = {
  pointsGained: number;
  totalPoints: number;
};

export default function CustomProgressBars({
  pointsGained,
  totalPoints,
}: Props) {
  const { palette } = useTheme();

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: palette.grey[100],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: palette.primary[500],
    },
  }));

  return (
    /*  <Box sx={{ flexGrow: 1, padding: "1rem 0rem" }}>
      <BorderLinearProgress variant="determinate" value={number} />
      <Typography variant="h4">Points gained</Typography>
    </Box> */

    <Box sx={{ flexGrow: 1, padding: "1rem 0rem", position: "relative" }}>
      {/* Points Gained in Top Left Corner */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: "0.7rem",
          color: palette.secondary[400],
        }}
      >
        My Points : {pointsGained}
      </Typography>

      {/* BorderLinearProgress */}
      <BorderLinearProgress variant="determinate" value={20} />

      {/* Total Points in Bottom Right Corner */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
        //   bottom: 0,
          right: 0,
          fontSize: "0.7rem",
          color: palette.secondary[500],
        }}
      >
        Total Points: {totalPoints}
      </Typography>

      {/* <Typography variant="h4">Points gained</Typography> */}
    </Box>
  );
}
