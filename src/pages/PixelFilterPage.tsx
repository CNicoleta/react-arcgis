import PageTemplate from "components/common/PageTemplate";
import CoreMap from "components/core/CoreMap";
import CoreSlider from "components/core/CoreSlider";
import mapStore from "store/Map";

import DimensionalDefinition from "@arcgis/core/layers/support/DimensionalDefinition";
import MosaicRule from "@arcgis/core/layers/support/MosaicRule";
import ImageryLayer from "@arcgis/core/layers/ImageryLayer.js";

import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
// import { whenOnce, on } from "@arcgis/core/core/reactiveUtils";
// import Slider from "@arcgis/core/widgets/Slider";

const layerUrl =
  "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ScientificData/SeaTemperature/ImageServer";
// "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NLCDLandCover2001/ImageServer";

const PixelFilterPage = () => {
  const [sliderValues, setSliderValues] = useState<number[]>([-3, 37]);
  const sliderMinDistance = 1;

  const createMosaicRule = () => {
    const dimInfo: DimensionalDefinition[] = [];

    //definire temperatura la suprafata marii
    const depth = new DimensionalDefinition({
      dimensionName: "StdZ", //adancimea apei
      values: [0],
      isSlice: true,
    });

    //definire timp
    const time = new DimensionalDefinition({
      dimensionName: "StdTime",
      values: [1396828800000],
      isSlice: true,
    });

    dimInfo.push(depth, time);

    const mosaicRule = new MosaicRule({
      multidimensionalDefinition: dimInfo,
    });

    return mosaicRule;
  };

  //layer.redraw() = function defined in layer.pixelFilter is re-executed

  const handlePixelsFilter = (pixelData: __esri.PixelData) => {
    if (pixelData === null || pixelData.pixelBlock === null) return;

    const { pixelBlock } = pixelData;
    const { pixels, width, height, statistics } = pixelBlock; //pixels visible in the view

    // let mask = pixelBlock.mask;
    //number of pixels in the pixelBlock
    const numPixels = width * height;

    //get min and max values of the data in the current view
    const minVal = statistics[0].minValue;
    const maxVal = statistics[0].maxValue;

    if (!minVal || !maxVal) return;

    //calculate the factor by which to determine the red and blue values
    const factor = 255 / (maxVal - minVal);

    if (!pixels || pixels.length === 0) return;
    const tempBand = pixels[0];
    const p1 = pixels[0];

    //create empty arrays for each of the RGB bands to set on the pixelBlock
    const rBand = new Uint8Array(p1.length);
    const gBand = new Uint8Array(p1.length);
    const bBand = new Uint8Array(p1.length);

    const mask = new Uint8Array(p1.length);
    mask.fill(1);
    pixelBlock.mask = mask;

    for (let i = 0; i < numPixels; i++) {
      if (mask[i] === 0) {
        continue;
      }

      const tempValue = tempBand[i];
      const red = (tempValue - minVal) * factor;

      mask[i] =
        p1[i] >= Math.floor(sliderValues[0]) &&
        p1[i] <= Math.floor(sliderValues[1])
          ? 1
          : 0;


      if (mask[i]) {
        rBand[i] = red;
        gBand[i] = 0;
        bBand[i] = 255 - red;
      }
    }

    pixelData.pixelBlock.pixels = [rBand, gBand, bBand]; 
    pixelData.pixelBlock.statistics = [];
    pixelData.pixelBlock.pixelType = "u8";
  };

  const layer = new ImageryLayer({
    url: layerUrl,
    mosaicRule: createMosaicRule(), 
    pixelFilter: handlePixelsFilter, 
  });

  const props = {
    mapProps: {
      basemap: "gray-vector",
      layers: [layer],
    },
    viewProps: {
      zoom: 2,
      center: [-32, 28],
      popup: {
        actions: [],
      },
    },
  };

  useEffect(() => {
    mapStore.set(props);
  }, []);

  const handleSliderChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // console.log({ newValue, activeThumb });

    if (activeThumb === 0) {
      layer.redraw();
      setSliderValues([
        Math.min(newValue[0], sliderValues[1] - sliderMinDistance),
        sliderValues[1],
      ]);
    } else {
      layer.redraw();
      setSliderValues([
        sliderValues[0],
        Math.max(newValue[1], sliderValues[0] + sliderMinDistance),
      ]);
    }
  };

  return (
    <PageTemplate title="Pixel Filter Page">
      <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
        <Typography fontSize={20}>
          Currently displaying locations with sea temperatures from $
          {sliderValues[0]} °C to ${sliderValues[1]} °C
        </Typography>

        <CoreSlider
          color="secondary"
          style={{ width: "400px" }}
          value={sliderValues}
          onChange={handleSliderChange}
          min={-3}
          max={37}
        />
 
      </div>

      <CoreMap/>
    </PageTemplate>
  );
};

export default PixelFilterPage;
