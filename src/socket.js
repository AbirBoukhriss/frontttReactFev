import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:5001", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connecté :", socket.id);
      console.log("🔹 Registering userId:", userId);
      socket.emit("register", { userId });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket déconnecté :", socket.id);
    });

    socket.on("receiveMessage", (msg) => {
      console.log("🟢 Nouveau message reçu via socket :", msg);
    });
  }
  return socket;
};

export const getSocket = () => socket;

// ✅ Assign to a variable before default export
const socketService = { initSocket, getSocket };
export default socketService;
