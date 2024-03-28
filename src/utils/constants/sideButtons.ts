import { IButtons } from "utils/interfaces/sideButtons";

export const toggleLayersButtons = [
    {
        id: "0",
        title: "Cities",
    },
    {
        id: "1",
        title: "Highways",
    },
    {
        id: "2",
        title: "States",
    },
];

export const buttons: IButtons[] = [
    {
        id: 0,
        title: "Contained btn",
        variant: "contained",
        onBtnClick: () => console.log("Contained btn clicked"),
    },
    {
        id: 1,
        title: "Outlined btn",
        variant: "outlined",
        onBtnClick: () => console.log("Outlined btn clicked"),
    },
    {
        id: 2,
        title: "Dashed btn",
        variant: "dashed",
        onBtnClick: () => console.log("Dashed btn clicked"),
    },
];