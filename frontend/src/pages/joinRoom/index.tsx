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
      // console.log(`${emailId} &&& ${roomNumber}`);
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
    <Box width={"100%"} height={"100%"} display={"grid"} gap={"1.5rem"}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email ID"
          value={emailId}
          onChange={(event) => setEmailId(event.target.value)}
          sx={{ color: palette.grey[300] }}
        />
        <TextField
          label="Room Number"
          value={roomNumber}
          onChange={(event) => setRoomNumber(event.target.value)}
          sx={{ color: palette.grey[300] }}
        />
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Join
        </Button>
      </form>
    </Box>
  );
};

export default JoinRoom;
