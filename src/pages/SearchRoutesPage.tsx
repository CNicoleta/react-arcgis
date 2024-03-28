import PageTemplate from "components/common/PageTemplate";
import CoreMap from "components/core/CoreMap";

import mapStore from "store/Map";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import Graphic from "@arcgis/core/Graphic";
import Collection from "@arcgis/core/core/Collection";

import esriConfig from "@arcgis/core/config";
import * as route from "@arcgis/core/rest/route.js";
import { on, whenOnce } from "@arcgis/core/core/reactiveUtils";

import { useCallback, useEffect } from "react";
import {
  createSimpleLineSymbol,
  createSimpleMarkerSymbol,
} from "utils/functions/graphics";
import { ISimpleMarkerSymbol } from "utils/interfaces/graphics";

esriConfig.apiKey = "";

const routeUrl =
  "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

const SearchRoutesPage = () => {
  const graphicsArray: Graphic[] = [];
  const routeLayer = new GraphicsLayer();

  const props = {
    mapProps: {
      basemap: "streets-navigation-vector",
      layers: [routeLayer],
    },
    viewProps: {
      center: [-117.195, 34.057],
      zoom: 13,
    },
  };

  useEffect(() => {
    mapStore.set(props);
  }, []);

  const stopsCollection = new Collection([]);

  const routeParams = new RouteParameters({
    stops: stopsCollection,
    outSpatialReference: {
      wkid: 3875,
    },
    returnStops: true,
  });

  const stopSymbolProps: ISimpleMarkerSymbol = {
    style: "cross",
    size: 15,
    outline: {
      width: 4,
    },
  };

  const stopSymbol = createSimpleMarkerSymbol(stopSymbolProps);

  const routeSymbolProps = {
    color: [0, 0, 255, 0.5],
    width: 5,
  };

  const routeSymbol = createSimpleLineSymbol(routeSymbolProps);

  const addStop = useCallback(
    (event: any) => {
      const { mapPoint } = event;
      const stop = new Graphic({
        geometry: mapPoint,
        symbol: stopSymbol,
      });

      routeLayer.add(stop);

      stopsCollection.push(stop);

      if (stopsCollection.length >= 2) {
        route.solve(routeUrl, routeParams).then(showRoute);
      }
    },
    [graphicsArray.length]
  );

  const showRoute = (data: __esri.RouteSolveResult) => {
    if (!data) return;

    const { routeResults } = data;
    const { route } = routeResults[0];

    if (!route) return;
    route.symbol = routeSymbol;

    routeLayer.add(route);
  };

  useEffect(() => {
    let watchHandle: any;

    whenOnce(() => mapStore.components.view.ready).then(() => {
      watchHandle = on(() => mapStore.components.view, "click", addStop);
    });

    return () => watchHandle?.remove();
  }, [mapStore.components.view.ready]);

  return (
    <PageTemplate title="Search Routes Page">
      <CoreMap />
    </PageTemplate>
  );
};

export default SearchRoutesPage;
