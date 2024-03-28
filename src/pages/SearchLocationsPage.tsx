import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import PageTemplate from "components/common/PageTemplate";
import CoreMap from "components/core/CoreMap";
// import CoreInput from "components/core/CoreInput";
import mapStore from "store/Map";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { whenOnce } from "@arcgis/core/core/reactiveUtils";
import { executeQueryJSON } from "@arcgis/core/rest/query";
import { addressToLocations } from "@arcgis/core/rest/locator";
import esriConfig from "@arcgis/core/config.js";

import { observer } from "mobx-react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import Search from "@arcgis/core/widgets/Search";

//*se foloseste API Key-ul user-ului
esriConfig.apiKey = "";

const SearchLocationsPage = () => {
  const [senators, setSenators] = useState<
    { name: string; address: string; geometry: __esri.Geometry }[]
  >([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [autoValue, setAutoValue] = useState<string | null>(null);

  const handleAutocompleteValue = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    setAutoValue(newValue);
  };

  const senatorsLayerUrl =
    "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/US_Senators_2020/FeatureServer/0";

  const districtsLayerUrl =
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_117th_Congressional_Districts_all/FeatureServer/0";

  const getSenatorsQueryResults = useMemo(async () => {
    const query = {
      outFields: ["*"],
      where: "Party = 'D' Or Party = 'R' Or Party = 'I'",
      returnGeometry: true,
    };

    const result = await executeQueryJSON(senatorsLayerUrl, query);
    if (!result) return;

    const { features } = result;

    if (features.length === 0) return;

    return features;
  }, [senatorsLayerUrl]);

  const getDistrictsQueryResults = useMemo(async () => {
    const query = {
      outFields: ["*"],
      where: "DISTRICTID IS NOT NULL",
      returnGeometry: true,
    };

    const result = await executeQueryJSON(districtsLayerUrl, query);

    if (!result) return;

    const { features } = result;
    if (features.length === 0) return;

    return features;
  }, [districtsLayerUrl]);

  const districtLayer = useRef(
    new FeatureLayer({
      url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_117th_Congressional_Districts_all/FeatureServer/0",
      outFields: ["*"],
    })
  );

  const senatorsLayer = useRef(
    new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/US_Senators_2020/FeatureServer/0",
      outFields: ["*"],
    })
  );

  // const firstSource = {
  //   layer: districtLayer.current,
  //   searchFields: ["DISTRICTID"],
  //   displayField: "DISTRICTID",
  //   exactMatch: false,
  //   outFields: ["DISTRICTID", "NAME", "PARTY"],
  //   name: "Congressional Districts",
  //   placeholder: "example: 3708",
  // };

  // const symbol = {
  //   type: "picture-marker", // autocasts as new PictureMarkerSymbol()
  //   url: "https://developers.arcgis.com/javascript/latest/sample-code/widgets-search-multiplesource/live/images/senate.png",
  //   height: 36,
  //   width: 36,
  // };

  // const secondSource = {
  //   layer: senatorsLayer.current,
  //   searchFields: ["Name", "Party"],
  //   suggestionTemplate: "{Name}, Party: {Party}",
  //   exactMatch: false,
  //   outFields: ["*"],
  //   placeholder: "example: Casey",
  //   name: "Senators",
  //   zoomScale: 500000,
  //   // resultSymbol: symbol,
  // };

  // const thirdSource = {
  //   name: "ArcGIS World Geocoding Service",
  //   placeholder: "example: Nuuk, GRL",
  //   apiKey:
  //     "AAPKdc22b9cbd75544ad98ebdf552ccde942t09dWFm47Js-IDrnlzg_ydqAGEuHaNo8oTNj2MD-wev6dMipGelbI0-HNpz-UdV8",
  //   singleLineFieldName: "SingleLine",
  //   url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
  // };

  // useEffect(() => {
  //   if (searchContainer.current) {
  //     new Search({
  //       view: mapStore.components.view,
  //       container: searchContainer.current,
  //       allPlaceholder: "District or Senator",
  //       includeDefaultSources: false,
  //       sources: [
  //         {
  //           ...firstSource,
  //         },
  //         {
  //           ...secondSource,
  //         },
  //         {
  //           ...thirdSource,
  //         },
  //       ],
  //     });
  //   }
  // }, [searchContainer]);

  useEffect(() => {
    if (senatorsLayer.current && districtLayer.current) {
      const props = {
        mapProps: {
          basemap: "dark-gray-vector",
          layers: [districtLayer.current, senatorsLayer.current],
        },
        viewProps: {
          center: [-97, 38], // lon, lat
          scale: 10000000,
        },
      };
      mapStore.set(props);
    }
  }, [districtLayer.current, senatorsLayer.current]);

  // const getFeatureLayerView = async (
  //   view: __esri.MapView,
  //   featureLayer: __esri.FeatureLayer
  // ) => {
  //   try {
  //     if (view) {
  //       const senatorsLayerView = await view.whenLayerView(featureLayer);

  //       if (!senatorsLayerView) return;

  //       return senatorsLayerView;
  //     }
  //   } catch (e) {
  //     console.log("Error layerView", e);
  //   }
  // };

  useEffect(() => {
    whenOnce(
      () => mapStore.components.view && senatorsLayer.current.loaded
    ).then(async () => {
      const senatorsQueryResults = await getSenatorsQueryResults;
      if (!senatorsQueryResults || senatorsQueryResults.length === 0) return;
      // console.log("senators", senatorsQueryResults);
      const senatorsNamesArr = senatorsQueryResults.map((senator) => {
        // console.log("senator", senator)
        const { attributes, geometry } = senator;
        const { Name, Address } = attributes;
        return {
          name: Name as string,
          address: Address.replace(
            /(Building)\s(Washington)/,
            "$1, $2,"
          ) as string,
          geometry,
        };
      });
      setSenators(senatorsNamesArr);
    });
  }, []);

  useEffect(() => {
    whenOnce(
      () => mapStore.components.view && senatorsLayer.current.loaded
    ).then(async () => {
      const districtsQueryResults = await getDistrictsQueryResults;
      if (!districtsQueryResults || districtsQueryResults.length === 0) return;
      // console.log("districts", districtsQueryResults);
      const districtsNamesArr = districtsQueryResults.map((district) => {
        const { attributes } = district;
        const { DISTRICTID } = attributes;
        return DISTRICTID as string;
      });
      setDistricts(districtsNamesArr);
    });
  }, []);

  const searchAddress = useCallback(async () => {
    // const firstSenatorAddress = senators[0].geometry;

    // console.log(firstSenatorAddress);
    const result = await addressToLocations(
      "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      {
        address: "380 New York St, Redlands, CA 92373",
        // location:{
        //   type: firstSenatorAddress.type
        // }
        outFields: ["*"],
      }
    );

    // console.log(result);

    if (!result) return;
    return result;
  }, [senators.length]);

  useEffect(() => {
    // console.log(senators)

    if (senators.length > 0) {
      // console.log(senators);
      searchAddress()
        .then((result) => {
          console.log("search result", result);
        })
        .catch((e) => console.log(e));
    }
  }, [senators]);

  //TODO: de vazut locator

  return (
    <PageTemplate title="Search locations">
      <Autocomplete
        id="autocomplete-input"
        value={autoValue}
        onChange={handleAutocompleteValue}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
        options={districts}
        renderInput={(params) => <TextField {...params} />}
      />
      {/* <CoreInput value={inputValue} onChange={handleInputValue} /> */}
      {/* <div ref={searchContainer}></div> */}
      <CoreMap />
    </PageTemplate>
  );
};

export default observer(SearchLocationsPage);
