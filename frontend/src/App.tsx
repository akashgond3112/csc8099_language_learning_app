import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FlashCards from "./pages/flashCards";
import JoinRoom from "./pages/joinRoom";
import Room from "./pages/joinRoom/components/Room";
import Dashboard from "./pages/dashboard";
import StartQuiz from "./pages/quiz";
import Report from "./pages/report";
import Leaderboard from "./pages/leaderBoard";
import RootLayout from "./layouts/Root";
import ErrorPage from "./pages/utils/error";
import LoginRegister from "./pages/loginSignUp";

/* react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginRegister />,
      },
      {
        path: "/dashBoard",
        element: <Dashboard />,
      },
      {
        path: "/quiz",
        element: <StartQuiz />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/joinroom",
        element: <JoinRoom />,
      },
      {
        path: "/joinroom/:roomNumber",
        element: <Room />,
        id: "room-detail",
      },
      {
        path: "/leaderBoard",
        element: <Leaderboard />,
      },
      {
        path: "/flashcards",
        element: <FlashCards />,
      },
    ],
  },
]);

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box width="100%" height="100%" padding="1rem 2rem 4rem  2rem">
        <RouterProvider router={router} />;
      </Box>
    </ThemeProvider>
  );
}

export default App;
