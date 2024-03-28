export type SymbolStyleType =
    | "caret"
    | "circle-caret"
    | "arrow"
    | "circle-arrow"
    | "plus-minus"
    | "circle-plus-minus"
    | "square"
    | "circle"
    | "triangle"
    | "happy-sad"
    | "thumb"
    | ""
    | undefined;

export type ThemeType = "below" | "above" | "" | "above-and-below";


export interface IInitialState {
    theme: ThemeType;
    symbol: SymbolStyleType;
}

export const initialState: IInitialState = {
    theme: "",
    symbol: "",
};
