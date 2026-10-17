// utils/socket.js
import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io(import.meta.env.VITE_APP_BASE_URL, {
    withCredentials: true,  // ✅ Add this
    transports: ["websocket", "polling"], // ✅ Fallback support
  });
};