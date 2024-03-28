import { ThemeProvider } from "@mui/material";
import { useThemeContext } from "./ThemeContextProvider";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const context = useThemeContext();
  if (!context) return;
  const { theme } = context;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
