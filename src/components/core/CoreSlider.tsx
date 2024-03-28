import { FC } from "react";

import Slider, { SliderProps } from "@mui/material/Slider";

interface ICoreSliderProps extends SliderProps {}

const CoreSlider: FC<ICoreSliderProps> = (props) => {
  const { min, max, step, ...rest } = props;
  return (
    <Slider min={min} max={max} step={step} valueLabelDisplay="on" {...rest} />
  );
};

export default CoreSlider;
