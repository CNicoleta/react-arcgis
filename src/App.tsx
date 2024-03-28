import styles from "./App.module.css";

import Navbar from "components/common/Navbar";
import CoreSwitch from "components/core/CoreSwitch";
import SideButtons from "components/SideButtons";

import { useThemeContext } from "utils/theme/ThemeContextProvider";

import ToggleSublayersPage from "pages/ToggleSublayersPage";
import VisualVariablesPage from "pages/VisualVariablesPage";
import PixelFilterPage from "pages/PixelFilterPage";
import HomePage from "pages/HomePage";
import SearchLocationsPage from "pages/SearchLocationsPage";
import SearchRoutesPage from "pages/SearchRoutesPage";

import { useState } from "react";

import { Typography, useTheme } from "@mui/material";

import { Route, Routes, useNavigate } from "react-router";

import { observer } from "mobx-react";

const App = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const theme = useTheme();
  const context = useThemeContext();

  const navigate = useNavigate();

  const displayTheme = isChecked ? "Dark theme" : "Light theme";

  if (!context) return;

  const { toggleTheme } = context;

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    toggleTheme();
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ backgroundColor: theme.palette.primary.light }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <div>
            <CoreSwitch value={isChecked} onChange={handleSwitchChange} />

            <Typography>{displayTheme}</Typography>
          </div>

          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/023/188/651/small/earth-day-tree-on-the-green-earth-background-generative-ai-free-photo.jpeg"
            alt="globe img"
            width={150}
            height={80}
            style={{ borderRadius: "15px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        <Navbar />
      </div>

      <div
        className={styles.sidebar}
        style={{ backgroundColor: theme.palette.primary.dark }}
      >
        <SideButtons />
      </div>

      <div
        className={styles.content}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <Routes>
          {/* {appRoutes.map((route) => (
            <Route key={route.id} path={route.path} element={[route.element]} />
          ))} */}
          <Route path="/" element={<HomePage />} />
          <Route path="/toggle-sublayers" element={<ToggleSublayersPage />} />
          <Route path="/visual-variables" element={<VisualVariablesPage />} />
          <Route path="/search-locations" element={<SearchLocationsPage />} />
          <Route path="/search-routes" element={<SearchRoutesPage />} />
          <Route path="/pixel-filter" element={<PixelFilterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default observer(App);
