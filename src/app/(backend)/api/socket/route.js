import { Server } from "socket.io";

// const ioHandler = (req, res) => {
//     if (!res?.socket?.server?.io) {
//         const io = new Server(res?.socket?.server, {
//             path: "/api/socket",
//             cors: {
//                 origin: "http://localhost:3000", // Update with your client URL
//                 methods: ["GET", "POST"],
//             },
//         });
//         io.on("connection", (socket) => {
//             console.log("A user connected:", socket?.id);

//             socket.on("message", (data) => {
//                 console.log("Message received:", data);
//                 socket.broadcast.emit("message", data);
//             });

//             socket.on("disconnect", () => {
//                 console.log("A user disconnected");
//             });

//         });
//         res?.socket?.server?.io = io;
//         console.log("Socket.IO server initialized");
//     }
//     res.end();
// };

// export const GET = ioHandler;
// export const POST = ioHandler;

export async function GET(req, res) {
    console.log("Socket.IO server initialized");

    try {
        if (!res?.socket?.server?.io) {
            const io = new Server(res?.socket?.server, {
                path: "/api/socket",
                cors: {
                    origin: "http://localhost:3000", // Update with your client URL
                    methods: ["GET", "POST"],
                },
            });
            io.on("connection", (socket) => {
                console.log("A user connected:", socket?.id);

                socket.on("message", (data) => {
                    console.log("Message received:", data);
                    socket.broadcast.emit("message", data);
                });

                socket.on("disconnect", () => {
                    console.log("A user disconnected");
                });

            });
            res?.socket?.server?.io = io;
            console.log("Socket.IO server initialized");
        }
        res.end();
    } catch (error) {

    }
}