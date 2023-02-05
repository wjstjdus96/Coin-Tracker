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
  price: number;
  purchase: number;
}

export interface ICardState {
  [key: string]: ICoin[];
}

export const boardState = atom<string[]>({
  key: "board",
  default: ["WANT", "HAVE", "SELL", "HI"],
});

export const cardState = atom<ICardState>({
  key: "card",
  default: {
    WANT: [
      { id: 1, text: "hello", price: 1999237478, purchase: 20 },
      { id: 3, text: "hi", price: 197478, purchase: 10 },
    ],
    HAVE: [{ id: 2, text: "yo", price: 3423743432378, purchase: 23 }],
    SELL: [],
    HI: [],
  },
});

export const trashBinState = atom<boolean>({
  key: "trash",
  default: false,
});

export const darkState = atom<boolean>({
  key: "dark",
  default: false,
});

export const boardModalState = atom<boolean>({
  key: "boardModal",
  default: false,
});
