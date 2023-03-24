import Layout from "@/components/layout/Layout";
import AuthContext from "@/store/Authcontext";
import Link from "next/link";
import React, { useContext } from "react";

function ChatPage() {
  const authCtx: any = useContext(AuthContext);
  return (
    <Layout>
      <main>
        <h1>Chat Menu</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
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
      </main>
    </Layout>
  );
}

export default ChatPage;
