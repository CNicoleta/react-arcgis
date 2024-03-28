//TODO: de inlocuit rutele existente

import FloodsMapPage from "pages/PixelFilterPage";
import PhoenixMapsPage from "pages/VisualVariablesPage";
import SwapMapsPage from "pages/ToggleSublayersPage";

interface IAppRoute {
    id: string;
    pageTitle: string;
    path: string;
    element: () => any;
}

export const appRoutes: IAppRoute[] = [
    {
        id: "toggle-sublayers",
        pageTitle: "Toggle sublayers",
        path: "/",
        element: SwapMapsPage,
    },
    {
        id: "visual-variables",
        pageTitle: "Visual variables",
        path: "/visual-variables",
        element: PhoenixMapsPage
    },
    {
        id: "pixel-filter",
        pageTitle: "Pixel filter",
        path: "/pixel-filter",
        element: FloodsMapPage
    }
]