
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
// import ArcGISMapView from '@arcgis/core/views/MapView';

import { makeAutoObservable } from "mobx";


type ArcgisMapPropType = {
    mapProps: __esri.WebMapProperties;
    viewProps: __esri.MapViewProperties;
};

type ArcgisMapComponentsType = {
    map: WebMap | Map;
    view: MapView;
}

const defineMapComponent = (props: ArcgisMapPropType) => {
    let map;
    if (props.mapProps?.portalItem?.id) {
        map = new WebMap(props.mapProps)
    } else {
        map = new Map(props.mapProps)
    }

    return map;
}


class MapClass {
    customProps: ArcgisMapPropType = {
        mapProps: {},
        viewProps: {}
    };
    components: ArcgisMapComponentsType = {
        map: {} as WebMap | Map,
        view: {} as MapView
    };

    sublayerId = 0;
    sublayerVisibility = true;
    visibleSublayers: __esri.Sublayer[] = []

    constructor() {
        makeAutoObservable(this)
    }

    // initMapComponent() {
    //     import("@arcgis/map-components/dist/loader").then((result) => {
    //         if (!result) return;
    //         const { defineCustomElements } = result;

    //         return defineCustomElements();
    //     });
    // }

    // initMap(container: HTMLDivElement) {
    //     this.components.view = new ArcGISMapView({
    //         container,
    //         map: new WebMap(this.customProps.mapProps)
    //     })
    // }

    loadMap(container: HTMLDivElement) {

        this.components.map = defineMapComponent(this.customProps);
        this.components.view = new MapView({
            map: this.components.map,
            container,
            ...this.customProps.viewProps
        })

        return this.components.view
    }

    set(props: ArcgisMapPropType) {
        if (!props) return;
        const { mapProps, viewProps } = props;
        this.customProps = { mapProps, viewProps };

        return this.customProps;
    }

    setSublayerId(id: number) {
        this.sublayerId = id;
    }

    setVisibileSublayers(sublayers: __esri.Sublayer[]) {
        this.visibleSublayers = sublayers;
    }
}

const mapStore = new MapClass();

export default mapStore;