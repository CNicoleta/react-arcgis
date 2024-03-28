export interface ISimpleMarkerSymbol {
    style: "cross" | "circle" | "square" | "x" | "diamond" | "triangle" | "path" | undefined;
    size?: number;
    outline?: {
        width: number
    }
}