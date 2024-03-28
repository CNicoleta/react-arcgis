import { Theme } from "@mui/material";

import { createContext, memo, useContext, useMemo, useState } from "react";

import { darkTheme, lightTheme } from "./theme";

type ThemeContextType = {
  mode: string;
  toggleTheme: () => void;
  theme: Theme;
};

type ThemeMode = "light" | "dark";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeMode((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  const customTheme = useMemo(
    () => (themeMode === "light" ? lightTheme : darkTheme),
    [themeMode]
  );

  return (
    <ThemeContext.Provider
      value={{ mode: themeMode, toggleTheme: toggleTheme, theme: customTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const MemoedThemeContextProvider = memo(ThemeContextProvider);

export const useThemeContext = () => useContext(ThemeContext);
