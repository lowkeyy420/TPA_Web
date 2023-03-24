import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";

type Message = {
  SenderID: string;
  RecipientID: string;
  Message: string;
};

function ChatPage() {
  const authCtx: any = useContext(AuthContext);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocketUrl = "ws://localhost:3000/ws/sendMessage";
    const senderID = "1";
    const ws = new WebSocket(websocketUrl, senderID);

    ws.addEventListener("open", (event) => {
      console.log("Connected to WebSocket server:", event);
    });

    ws.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        JSON.parse(event.data) as Message,
      ]);
    });

    ws.addEventListener("close", (event) => {
      console.log("WebSocket closed:", event);
    });

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  function sendMessage() {
    if (socket && inputMessage) {
      const message = {
        SenderID: "1",
        RecipientID: "3",
        Message: inputMessage,
      };

      socket.send(JSON.stringify(message));
      setInputMessage("");
    }
  }

  return (
    <Layout>
      <main>
        <h1>Customer Service Chat</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "30px",
          }}
        >
          <Link href="/chat/customer-service">Customer Service</Link>
          <Link href="/chat/message-center">Message Center</Link>
          {authCtx.user["RoleID"] != 2 && (
            <Link href="/chat/seller-chat">Chat with store</Link>
          )}

          {authCtx.user["RoleID"] == 2 && (
            <Link href="/chat/customer-chat">Chat with customer</Link>
          )}
          {authCtx.user["RoleID"] == 4 && (
            <Link href="/chat/customer-service-reply">
              Chat with customer as customer service
            </Link>
          )}

          {authCtx.user["RoleID"] == 4 && (
            <Link href="/chat/message-center-reply">
              Chat with customer as Admin
            </Link>
          )}
        </div>

        <div
          style={{
            backgroundColor: "var(--tertiary-color-light)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {messages.map((message, index) => (
            <div
              style={{
                backgroundColor: "var(--background-color)",
                color: "var(--text-color)",
                padding: "13px",
                borderRadius: "20px",
              }}
              key={index}
            >
              <p>
                {message.SenderID == "1" ? "User" : "Customer Service"}:{" "}
                {message.Message}
              </p>
            </div>
          ))}
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={{
              height: "5vh",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderStyle: "solid",
              backgroundColor: "var(--background-color)",
              color: "var(--text-color)",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "10px 15px 10px 15px",
              backgroundColor: "var(--background-color)",
              color: "var(--text-color)",
              borderRadius: "20px",
              border: "0",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </main>
    </Layout>
  );
}

export default ChatPage;
