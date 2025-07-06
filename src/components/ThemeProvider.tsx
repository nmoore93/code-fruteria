import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Theme switching not supported in v4, just render children
  return <ConfigProvider>{children}</ConfigProvider>;
};
