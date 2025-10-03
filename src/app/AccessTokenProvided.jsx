"use client";
import { createContext, useEffect } from "react";
import { loadAccessToken } from "./api/axios";

export const AccessTokenContext = createContext();

export default function AccessTokenProvider({ children }) {
  useEffect(() => {
    loadAccessToken();
  }, []);

  return (
    <AccessTokenContext.Provider value={null}>
      {children}
    </AccessTokenContext.Provider>
  );
}
