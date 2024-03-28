import Switch, { SwitchProps } from "@mui/material/Switch";
import { FC } from "react";

interface ICoreSwitch extends SwitchProps {}

const CoreSwitch:FC<ICoreSwitch> = (props) => {
  return <Switch {...props} />;
};

export default CoreSwitch;
