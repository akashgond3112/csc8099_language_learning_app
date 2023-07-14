import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/utils";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ReactPlayer from "react-player";
import PeerService from "../components/../../../services/PeerService";
import { off } from "process";

type Props = {};

const Room = (props: Props) => {
  const params = useParams();
  const socket: Socket = useAppSelector((state) => state.socket.socket);
  const [remoteSocketId, setremoteSocketId] = useState<any | null>(null);
  const [myStream, setmyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const handleUserJoined = useCallback(
    (data: { emailId: any; roomNumber: any }) => {
      const { emailId, roomNumber } = data;
      //   console.log(`${emailId} &&& ${roomNumber}`);
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
    if (myStream !== null)
      for (const track of myStream.getTracks()) {
        PeerService.peer.addtrack(track, myStream);
      }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async (data: { from: any; answerCall: any }) => {
      const { from, answerCall } = data;
      await PeerService.setLocalDescription(answerCall);
      console.log(`Accepted Call ::: ${from} &&& ${answerCall}`);
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

  return (
    <div>
      <h1> {`ROOM ID ${params.roomNumber}`}</h1>
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      <h4>
        {remoteSocketId
          ? `User with remote ID joined: ${{ remoteSocketId }}`
          : `No One in Room`}
      </h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <>
          <h1>My Stream</h1>
          <ReactPlayer
            playing
            muted
            style={{ height: "100px", width: "200px" }}
            url={myStream}
          ></ReactPlayer>
        </>
      )}
      {remoteStream && (
        <>
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            style={{ height: "100px", width: "200px" }}
            url={remoteStream}
          ></ReactPlayer>
        </>
      )}
    </div>
  );
};

export default Room;
