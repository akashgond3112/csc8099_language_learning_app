import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import FlexBetween from "../../component/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* {LEFT SIDE } */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Linguist Prodigy
        </Typography>
      </FlexBetween>
      {/* {RIGHT SIDE} */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/"}
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/quiz"}
            onClick={() => setSelected("quiz")}
            style={{
              color: selected === "quiz" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Quiz
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/flashcards"}
            onClick={() => setSelected("flashcards")}
            style={{
              color: selected === "flashcards" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            FlashCards
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/joinroom"}
            onClick={() => setSelected("joinroom")}
            style={{
              color: selected === "joinroom" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Join Room
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/report"}
            onClick={() => setSelected("report")}
            style={{
              color: selected === "report" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Report
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
