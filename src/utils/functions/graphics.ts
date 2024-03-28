import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import Graphic from "@arcgis/core/Graphic";


export const createSimpleMarkerSymbol = (props: __esri.SimpleMarkerSymbolProperties) => (new SimpleMarkerSymbol(props));

export const createSimpleLineSymbol = (props: __esri.SimpleLineSymbolProperties) => (new SimpleLineSymbol(props));

export const createGraphic = (props: __esri.GraphicProperties) => (new Graphic(props))