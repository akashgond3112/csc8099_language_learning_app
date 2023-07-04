import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FlashCards from "./pages/flashCards";
import JoinRoom from "./pages/joinRoom";
import Dashboard from "./pages/dashboard";
import StartQuiz from "./pages/quiz";
import Report from "./pages/report";
import RootLayout from "./layouts/Root";
import ErrorPage from "./pages/utils/error";

/* react routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/quiz",
        element: <StartQuiz />,
      },
      {
        path: "/flashcards",
        element: <FlashCards />,
      },
      {
        path: "/joinroom",
        element: <JoinRoom />,
      },
      {
        path: "/report",
        element: <Report />,
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
