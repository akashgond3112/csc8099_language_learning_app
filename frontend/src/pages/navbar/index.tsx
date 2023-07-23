import { Avatar, Box, Button, Chip, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import FlexBetween from "../../component/FlexBetween";
import { useAppDispatch, useAppSelector } from "../../hooks/utils";
import ProfileAvatar from "./components/avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { postLogout } from "../../store/actions/auth-actions";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.nav);
  const { token, isLoggedIn } = useAppSelector((state) => state.auth);

  const handleLogut = () => {
    if (token !== null) dispatch(postLogout(token));
  };

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
        {state.firstLanguage != null &&
          state.firstLanguageImageUrl !== null && (
            <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <Chip
                avatar={
                  <Avatar
                    alt={state.firstLanguage}
                    src={state.firstLanguageImageUrl}
                  />
                }
                label={state.firstLanguage}
                variant="filled"
                sx={{ color: "white" }}
              />
            </Box>
          )}
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
        {isLoggedIn && state.imageUrl !== null && (
          <>
            <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
              <ProfileAvatar imageUrl={state.imageUrl} />
            </Box>
            <Box>
              <Button onClick={() => handleLogut()}>
                <LogoutIcon /> {`Logout`}
              </Button>
            </Box>
          </>
        )}
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
