import { type } from "os";
import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

//todo 관련
export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
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
  default: ["WANT", "HAVE", "SELL"],
});

export const coinState = atom<ICoinState>({
  key: "coin",
  default: {
    WANT: [
      { id: 1, text: "hello" },
      { id: 3, text: "hello" },
    ],
    HAVE: [{ id: 2, text: "yo" }],
    SELL: [],
  },
});
