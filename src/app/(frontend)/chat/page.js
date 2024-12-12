"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";



export default function Home() {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [iooo, setIOO] = useState(false);

    useEffect(() => {
        // Initialize the socket connection
        // const socketInstance = io("http://localhost:3000/api/socket"); // Use the standalone server URL or the API route
        const socketInstance = io("http://localhost:3000", {
            path: "/api/socket", // Match the server's Socket.IO path
            transports: ["websocket", "polling"],
        });

        setSocket(socketInstance);

        socketInstance.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socketInstance.on("connect", () => {
            console.log("Connected:", socket.id);
        });
        // Listen for messages
        socketInstance.on("message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
        // Cleanup on unmount
        return () => {
            // socketInstance.disconnect();
        };
    }, []);


    useEffect(() => {
        const fun = async () => {
          try {
              await fetch("/api/chat")
          } catch (error) {
            console.log("error::",error)
          }
        }
        fun()
    }, [])

    const sendMessage = () => {
        if (socket && message.trim()) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Socket.IO Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
