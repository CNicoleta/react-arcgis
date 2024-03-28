import { NavLink } from "react-router-dom";

import { navLinks } from "utils/links/navbar-links";

import { useTheme } from "@mui/material";

import { observer } from "mobx-react";

const Navbar = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        fontSize: "1.5em",
        display: "flex",
        justifyContent: "center",
        gap: 15,
      }}
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.id}
          id={link.id}
          to={link.path}
          // onClick={useCallback(
          //   () =>
          //     mapStore.set({
          //       mapProps: {
          //         portalItem: { id: link.mapId },
          //       },
          //       viewProps: {},
          //     }),
          //   [mapStore.customProps.mapProps]
          // )}
          style={{
            textTransform: "none",
            textDecoration: "none",
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.primary.dark,
          }}
        >
          {/* <Typography>{link.pageTitle}</Typography> */}
          {link.pageTitle}
        </NavLink>
      ))}
    </div>
  );
};

export default observer(Navbar);
