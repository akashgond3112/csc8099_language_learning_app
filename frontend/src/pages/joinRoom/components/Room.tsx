import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/utils";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ReactPlayer from "react-player";
import PeerService from "../components/../../../services/PeerService";
import { off } from "process";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";

type Props = {};

const Room = (props: Props) => {
  const params = useParams();
  const { palette } = useTheme();
  const naviagte = useNavigate();

  const socket: Socket = useAppSelector((state) => state.socket.socket);
  const [remoteSocketId, setremoteSocketId] = useState<any | null>(null);
  const [myStream, setmyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isStreamingStarted, setIsStreamingStarted] = useState(false);

  const handleUserJoined = useCallback(
    (data: { emailId: any; roomNumber: any }) => {
      const { emailId, roomNumber } = data;
      setremoteSocketId(roomNumber);
    },
    []
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await PeerService.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });

    setmyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async (data: { from: any; offer: any }) => {
      const { from, offer } = data;
      setremoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setmyStream(stream);

      console.log(`Incoming Call ::: ${from} &&& ${offer}`);

      const answerCall = await PeerService.getAnswer(offer);
      socket.emit("call:accepted", { to: from, answerCall });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream !== null) {
      for (const track of myStream.getTracks()) {
        PeerService.peer.addTrack(track, myStream);
      }
      setIsStreamingStarted(true);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async (data: { from: any; answerCall: any }) => {
      const { from, answerCall } = data;
      await PeerService.setLocalDescription(answerCall);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await PeerService.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    PeerService.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      PeerService.peer.removeEventListener(
        "negotiationneeded",
        handleNegoNeeded
      );
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    PeerService.peer.addEventListener(`track`, async (ev: any) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  });

  const handleNegotiationIncoming = useCallback(
    async (data: { from: any; offer: any }) => {
      const { from, offer } = data;
      const answer = await PeerService.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, answer });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(
    async (data: { from: any; answer: any }) => {
      const { from, answer } = data;
      await PeerService.setLocalDescription(answer);
    },
    []
  );

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegotiationIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegotiationIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    handleCallAccepted,
    handleIncomingCall,
    handleNegoNeedFinal,
    handleNegotiationIncoming,
    handleUserJoined,
    socket,
  ]);

  function endCall() {
    setIsStreamingStarted(false);
    setremoteSocketId(null);
    setmyStream(null);
    setRemoteStream(null);
    setIsStreamingStarted(false);
    naviagte("/joinroom");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "16px",
        }}
      >
        {myStream && (
          <>
            <Box>
              <h1
                style={{
                  backgroundColor: palette.primary[200],
                  borderRadius: "0.5em",
                  width: "10em",
                  textAlign: "center",
                  margin: "none",
                }}
              >
                My Stream
              </h1>
            </Box>
            <ReactPlayer
              playing
              muted
              style={{ height: "100px", width: "200px" }}
              url={myStream}
            />
          </>
        )}
        {remoteStream && (
          <>
            <Box
              style={{
                backgroundColor: palette.primary[200],
                borderRadius: "0.5em",
                width: "8em",
                textAlign: "center",
              }}
            >
              <h1>Remote Stream</h1>
            </Box>
            <ReactPlayer
              playing
              muted
              style={{ height: "100px", width: "200px" }}
              url={remoteStream}
            />
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <h1
            style={{
              backgroundColor: palette.primary[200],
              borderRadius: "0.5em",
              width: "8em",
              textAlign: "center",
            }}
          >
            {remoteSocketId ? `User Joined` : "No One in Room"}
          </h1>
        </Box>
        <Box>
          <h1
            style={{
              backgroundColor: palette.primary[200],
              borderRadius: "0.5em",
              width: "9em",
              textAlign: "center",
            }}
          >{`Room Number : ${params.roomNumber}`}</h1>
        </Box>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            sx={{ backgroundColor: palette.secondary[200], height: "0.5em" }}
          />
        </Box>
      </Box>

      {!isStreamingStarted ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginTop: "16px",
          }}
        >
          {myStream && (
            <Button
              sx={{
                borderRadius: "1em",
                padding: "1em 5em",
                // margin: "1em",
              }}
              type="submit"
              variant="outlined"
              onClick={sendStreams}
            >
              Send Stream
            </Button>
          )}
          {remoteSocketId && (
            <Button
              sx={{
                borderRadius: "1em",
                padding: "1em 5em",
              }}
              type="submit"
              variant="outlined"
              onClick={handleCallUser}
            >
              Call
            </Button>
          )}
        </Box>
      ) : (
        <Button
          sx={{
            borderRadius: "1em",
            padding: "1em 5em",
            // margin: "1em",
          }}
          type="submit"
          variant="outlined"
          onClick={endCall}
        >
          End
        </Button>
      )}
    </Box>
  );
};

export default Room;
