export type KeyName =
    | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
    | "w" | "a" | "s" | "d"
    | "Space" | "Shift" | "Control" | "Alt"
    | "Enter" | "Escape"
    | "Tab";

export type KeysT = {
    [key: string]: {
        pushed: boolean;
        timestamp: number;
    }
};