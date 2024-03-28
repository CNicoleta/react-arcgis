import { useCallback, useEffect, useRef, useState } from "react";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as sizeRendererCreator from "@arcgis/core/smartMapping/renderers/size";
import * as colorAndSizeRendererCreator from "@arcgis/core/smartMapping/renderers/univariateColorSize";
import { whenOnce } from "@arcgis/core/core/reactiveUtils";

import PageTemplate from "components/common/PageTemplate";
import CoreMap from "components/core/CoreMap";
import mapStore from "store/Map";
import CoreSelect from "components/core/CoreSelect";
import { selectArr } from "utils/constants/phoenixPage";
import {
  SymbolStyleType,
  ThemeType,
  IInitialState,
  initialState,
} from "utils/interfaces/visualVaribles";

import { observer } from "mobx-react";

import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";

//*RenderOptionsContainer ar putea fi o componenta separata, mutata in fisier separat
const RenderOptionsContainer = ({
  value,
  onSelectChange,
}: {
  value: any;
  onSelectChange: (event: SelectChangeEvent<unknown>) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        backgroundColor: "orange",
        padding: 10,
        borderRadius: "15px",
      }}
    >
      {selectArr.map((el) => (
        <div
          key={el.id}
          style={{ display: "flex", gap: 15, alignItems: "baseline" }}
        >
          <p style={{ width: "200px" }}>{el.description}</p>
          <CoreSelect
            inputLabelText={el.label}
            name={el.id}
            labelId={el.id}
            selectId={el.id}
            options={el.options}
            value={value[el.id]}
            onChange={onSelectChange}
          />
        </div>
      ))}
    </div>
  );
};

const VisualVariablesPage = () => {
  const [selectValues, setSelectValue] = useState<IInitialState>(initialState);

  const [legend, setLegend] = useState<string>("");

  const legendTitles = {
    above: `Increase in number of households 2000-2010`,
    below: `Decline in number of households 2000-2010`,
    "above-and-below": `Change in number of households 2000-2010`,
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    setSelectValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const layer = useRef<FeatureLayer>(
    new FeatureLayer({
      title: "Census tracts",
      portalItem: {
        id: "936481805c2d4639ac727938b32d8ec3",
      },
      layerId: 2,
      minScale: 0,
      maxScale: 0,
      opacity: 0.01,
      outFields: ["TOTHU10", "TOTHU00"],
    })
  );

  const props = {
    mapProps: {
      basemap: "gray-vector",
      layers: [layer.current],
    },
    viewProps: {
      center: [-83.0208, 42.4388],
      scale: 543438,
      constraints: {
        snapToZoom: false,
      },
    },
  };

  useEffect(() => {
    mapStore.set(props);
  }, []);

  const createRenderer = async (
    theme: ThemeType,
    symbolStyle: SymbolStyleType
  ) => {
    //daca sunt selectate una din valorile above sau below atunci ca symbol vor fi cercuri de aceeasi culoare dar dimensiuni diferite
    //daca este selectata optiunea above-and-below atunci simbolurile pot fi schimbate cu una din celelalte optiuni, iar dimensiunea si culoarea lor va fi diferita

    switch (theme) {
      case "above": {
        const params = {
          layer: layer.current,
          view: mapStore.components.view,
          theme: theme,
          valueExpression: `$feature.TOTHU10 - $feature.TOTHU00`,
          minValue: -1000,
          maxValue: 2000,
        };
        const { renderer } = await sizeRendererCreator.createContinuousRenderer(
          params
        );

        return renderer;
      }

      case "below": {
        const params = {
          layer: layer.current,
          view: mapStore.components.view,
          theme: theme,
          valueExpression: `$feature.TOTHU10 - $feature.TOTHU00`,
          minValue: -1000,
          maxValue: 2000,
        };
        const { renderer } = await sizeRendererCreator.createContinuousRenderer(
          params
        );

        return renderer;
      }

      case "above-and-below": {
        const params = {
          layer: layer.current,
          view: mapStore.components.view,
          theme: theme,
          valueExpression: `$feature.TOTHU10 - $feature.TOTHU00`,
          minValue: -1000,
          maxValue: 2000,
          symbolOptions: {
            symbolStyle: symbolStyle !== "" ? symbolStyle : undefined,
          },
        };

        const { renderer } =
          await colorAndSizeRendererCreator.createContinuousRenderer(params);
          
        return renderer;
      }

      default:
        return;
    }
  };

  const updateLayer = useCallback(
    async (layerView: __esri.FeatureLayerView) => {
      const theme = selectValues.theme;
      const symbolStyle = selectValues.symbol;

      if (!theme && !symbolStyle) return;

      const customRenderer = await createRenderer(theme, symbolStyle);
      if (!customRenderer) return;

      layer.current.renderer = customRenderer;

      whenOnce(() => !layerView?.updating).then(() => {
        layer.current.opacity = 1;
      });
    },
    [selectValues.symbol, selectValues.theme]
  );

  const getLayerView = async (view: __esri.MapView, layer: FeatureLayer) => {
    const layerView = await view.whenLayerView(layer);

    return layerView;
  };

  useEffect(() => {
    if (mapStore.components.view && layer.current) {
      whenOnce(() => mapStore.components.view.ready)
        .then(async () => {
          const layerView = await getLayerView(
            mapStore.components.view,
            layer.current
          );

          if (!layerView) return;

          updateLayer(layerView);
        })
        .catch((e) => console.log("view not ready", e));
    }
  }, [
    mapStore.components.view,
    layer.current,
    selectValues.theme,
    selectValues.symbol,
  ]);

  useEffect(() => {
    if (selectValues.theme !== "") {
      setLegend(legendTitles[selectValues.theme]);
    }
  }, [selectValues.theme]);

  return (
    <PageTemplate title="Visual Variables Page">
      <RenderOptionsContainer
        value={selectValues}
        onSelectChange={handleSelectChange}
      />
      {legend !== "" && <Typography>{legend}</Typography>}
      <CoreMap />
    </PageTemplate>
  );
};

export default observer(VisualVariablesPage);
