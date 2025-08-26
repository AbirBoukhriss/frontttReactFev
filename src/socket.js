import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
  withCredentials: true,
  autoConnect: false,
});

export const initSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.on("connect", () => {
      console.log("🔗 Socket connecté :", socket.id);
      socket.emit("register", { userId });
      console.log("📌 Register envoyé :", userId);
    });
  }
};

export default socket;
