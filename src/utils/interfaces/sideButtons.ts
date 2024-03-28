export interface IButtons {
    id: number;
    title: string;
    variant: "contained" | "outlined" | "dashed";
    onBtnClick: () => void;
}