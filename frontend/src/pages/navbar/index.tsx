import { Avatar, Box, Button, Chip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import FlexBetween from "../../component/FlexBetween";
import { useAppSelector } from "../../hooks/utils";
import ProfileAvatar from "./components/avatar";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();

  const state = useAppSelector((state) => state.nav);

  const isUserLoggedIn: boolean = true;

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* {LEFT SIDE } */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Link to={"/"}>
          <Typography variant="h4" fontSize="16px">
            Linguist Prodigy
          </Typography>
        </Link>
      </FlexBetween>
      {/* {RIGHT SIDE} */}
      <FlexBetween gap="2rem">
        {state.secondLanguage != null &&
          state.secondLanguageImageUrl !== null && (
            <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <Chip
                avatar={
                  <Avatar
                    alt={state.secondLanguage}
                    src={state.secondLanguageImageUrl}
                  />
                }
                label={state.secondLanguage}
                variant="filled"
                sx={{ color: "white" }}
              />
            </Box>
          )}
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/dashBoard"}
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
            Flashcards
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
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/leaderBoard"}
            onClick={() => setSelected("leaderBoard")}
            style={{
              color: selected === "leaderBoard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Leader Board
          </Link>
        </Box>
        {isUserLoggedIn && (
          <>
            <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <ProfileAvatar />
            </Box>
            <Box>
              <Button>
                <LogoutIcon /> {`Logout` }
              </Button>
            </Box>
          </>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
