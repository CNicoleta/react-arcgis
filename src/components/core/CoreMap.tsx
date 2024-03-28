// import config from "@arcgis/core/config";
// import { ArcgisMap } from "@arcgis/map-components-react";

import { observer } from "mobx-react";
// import React from "react";

import { FC, useEffect, useRef } from "react";

import mapStore from "store/Map";

// config.request.useIdentity = false;

interface ICoreMap {
  children?: React.ReactNode;
}

const CoreMap: FC<ICoreMap> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { customProps, components } = mapStore;

  let mapViewRef = useRef<__esri.MapView>();

  useEffect(() => {
    if (divRef.current) {
      mapViewRef.current = mapStore.loadMap(divRef.current);
    }

    return () => mapViewRef.current?.destroy();
  }, [divRef, customProps?.mapProps]);

  useEffect(() => {
    if (components.view) components?.view?.ui.remove(["attribution", "zoom"]);
  }, [components.view]);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={divRef}>
      {children}
      {/* <ArcgisMap itemId={customProps.mapProps.portalItem?.id}>
        <calcite-label></calcite-label>
        <ArcgisHome position="right" />
      </ArcgisMap> */}
    </div>
  );
};

export default observer(CoreMap);
