// utils/socket.js
import { io } from "socket.io-client";
import { APP_BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(APP_BASE_URL, {
    withCredentials: true,  // ✅ Add this
    transports: ["websocket", "polling"], // ✅ Fallback support
  });
};