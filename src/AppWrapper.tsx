import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import App from "./App";

import { MemoedThemeContextProvider } from "./utils/theme/ThemeContextProvider";
import ThemeWrapper from "./utils/theme/ThemeWrapper";

const AppWrapper = () => {
  return (
    <MemoedThemeContextProvider>
      <CssBaseline />
      <ThemeWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeWrapper>
    </MemoedThemeContextProvider>
  );
};

export default AppWrapper;
