"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Provider({
    children,
    session
  }: {
    children: React.ReactNode;
    session: any;
  }): React.JSX.Element {
  return (
    <SessionProvider session={session}>
       {children}
    </SessionProvider>
  );
}
