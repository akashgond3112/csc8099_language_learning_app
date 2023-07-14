import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const _socket = io("http://localhost:8080");

interface SocketState {
  socket: any;
}

const initialState: SocketState = {
  socket: _socket,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
});

export const {} = socketSlice.actions;

export default socketSlice;
