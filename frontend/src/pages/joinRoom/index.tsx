import { Box, Button, TextField, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useAppSelector } from "../../hooks/utils";

const JoinRoom = () => {
  const { palette } = useTheme();
  const [emailId, setEmailId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const socket = useAppSelector((state) => state.socket.socket);

  // const socket1 = io("http://localhost:8080");

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      socket.emit("room:join", { emailId, roomNumber });
    },
    [emailId, roomNumber, socket]
  );

  const handleJoinRoom = useCallback(
    (data: { emailId: any; roomNumber: any }) => {
      const { emailId, roomNumber } = data;
      navigate(`/joinroom/${roomNumber}`);
    },
    []
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join");
    };
  }, [handleJoinRoom, socket]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderRadius: "0.5em",
          padding: "2px",
        }}
      >
        <TextField
          label="Email ID"
          value={emailId}
          onChange={(event) => setEmailId(event.target.value)}
          sx={{ backgroundColor: "white", borderRadius: "1em" }}
        />
        <TextField
          label="Room Number"
          value={roomNumber}
          onChange={(event) => setRoomNumber(event.target.value)}
          sx={{ backgroundColor: "white", borderRadius: "1em" }}
        />
        <Button
          sx={{
            borderRadius: "1em",
            padding: "1em 1em",
            // margin: "1em",
          }}
          type="submit"
          variant="outlined"
        >
          Join
        </Button>
      </Box>
    </Box>
  );
};

export default JoinRoom;
