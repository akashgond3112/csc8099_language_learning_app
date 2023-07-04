import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  title: String;
  children: React.ReactNode;
  openPopup: any;
  setOpenPopUp: () => void;
};

function Popup({ title, children, openPopup, setOpenPopUp }: Props) {
  return (
    <Dialog
      open={openPopup}
      maxWidth="xl"
      style={{}}
    >
      <DialogTitle>
        <div>
          <Typography variant="h2" component={"div"}>
            Select your Native and language you want to learn.
          </Typography>
          <IconButton
            aria-label="close"
            onClick={setOpenPopUp}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
