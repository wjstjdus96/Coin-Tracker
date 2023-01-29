import { type } from "os";
import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

///

export interface ICoin {
  id: number;
  text: string;
}

export interface ICoinState {
  [key: string]: ICoin[];
}

export const boardState = atom<string[]>({
  key: "board",
  default: ["WANT", "HAVE", "SELL", "HI"],
});

export const coinState = atom<ICoinState>({
  key: "coin",
  default: {
    WANT: [
      { id: 1, text: "hello" },
      { id: 3, text: "hi" },
    ],
    HAVE: [{ id: 2, text: "yo" }],
    SELL: [],
    HI: [],
  },
});

export const trashBinState = atom<boolean>({
  key: "trash",
  default: false,
});
