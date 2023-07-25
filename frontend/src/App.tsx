import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import {
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import RequireAuth from "../src/component/RequireAuth";
import FlashCards from "./pages/flashCards";
import JoinRoom from "./pages/joinRoom";
import Room from "./pages/joinRoom/components/Room";
import Dashboard from "./pages/dashboard";
import StartQuiz from "./pages/quiz/";
import Report from "./pages/report";
import Leaderboard from "./pages/leaderBoard";
import RootLayout from "./layouts/Root";
import ErrorPage from "./pages/utils/error";
import LoginRegister from "./pages/loginSignUp";
import Quiz from "./pages/quiz/components/Quiz";



function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box width="100%" height="100%" padding="1rem 2rem 4rem  2rem">
        {/* <RouterProvider router={router} />; */}
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* public routes */}
            <Route path="/" element={<LoginRegister />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="/dashBoard" element={<Dashboard />} />
              <Route path="/quiz" element={<StartQuiz />} />
              <Route path="/quiz/:usertestId" element={<Quiz />} />
              <Route path="/report" element={<Report />} />
              <Route path="/joinroom" element={<JoinRoom />} />
              <Route path="/joinroom/:roomNumber" element={<Room />} />
              <Route path="/leaderBoard" element={<Leaderboard />} />
              <Route path="/flashcards" element={<FlashCards />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
