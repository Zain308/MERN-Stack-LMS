"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}