import CoreMap from "components/core/CoreMap";
import PageTemplate from "components/common/PageTemplate";

import mapStore from "store/Map";

import { useEffect } from "react";

import { observer } from "mobx-react";

import MapImageLayer from "@arcgis/core/layers/MapImageLayer.js";

const ToggleSublayersPage = () => {

  const layer = new MapImageLayer({
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
    sublayers: [
      {
        id: 2,
        visible: true,
      },
      // {
      //   id: 4,
      //   visible: false,
      //   title: "Railroads",
      //   renderer: renderer,
      //   source: {
      //     // indicates the source of the sublayer is a dynamic data layer
      //     type: "data-layer",
      //     // this object defines the data source of the layer
      //     // in this case it's a feature class table from a file geodatabase
      //     dataSource: {
      //       type: "table",
      //       // workspace name
      //       workspaceId: "MyDatabaseWorkspaceIDSSR2",
      //       // table name
      //       dataSourceName: "ss6.gdb.Railroads",
      //     },
      //   },
      // },
      {
        id: 1,
        visible: true,
      },
      {
        id: 0,
        visible: true,
      },
    ],
  });

  const props = {
    mapProps: {
      basemap: "dark-gray-vector",
      layers: [layer],
    },
    viewProps: {
      zoom: 3,
      center: [-99, 39],
    },
  };

  useEffect(() => {
    mapStore.set(props);
    if (layer) {
      mapStore.setVisibileSublayers(layer.allSublayers.toArray());
    }
  }, [layer]);

  return (
    <PageTemplate title="Toggle Sublayers Page">
      <CoreMap />
    </PageTemplate>
  );
};

export default observer(ToggleSublayersPage);
