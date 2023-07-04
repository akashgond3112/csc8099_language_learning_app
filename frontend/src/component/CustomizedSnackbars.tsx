import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  errorType: String;
  errorMessage: String;
  openSnack: boolean;
};

export default function CustomizedSnackbars({
  errorType,
  errorMessage,
  openSnack,
}: Props) {
  console.log(errorType);

  const [open, setOpen] = React.useState(openSnack);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {errorType === "success" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
}
